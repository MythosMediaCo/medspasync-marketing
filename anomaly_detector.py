import json
from datetime import datetime
from typing import List, Dict, Any
import sys

import numpy as np
from sklearn.ensemble import IsolationForest


def _parse_date(date_str: str) -> datetime | None:
    """Return datetime from ISO string or None."""
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str)
    except (ValueError, TypeError):
        return None


def flag_anomalies(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Flag anomalous transaction records using Isolation Forest.

    Parameters
    ----------
    records : list of dict
        Input records containing fields ``amount``, ``matchConfidence`` and ``date``.

    Returns
    -------
    list of dict
        Records with added ``flagged`` boolean and ``anomalyScore`` float.
    """
    if not records:
        return []

    # Extract dates first to compute relative days
    parsed_dates = [_parse_date(r.get("date")) for r in records]
    valid_dates = [d for d in parsed_dates if d is not None]
    min_date = min(valid_dates) if valid_dates else None

    features = []
    for r, d in zip(records, parsed_dates):
        try:
            amount = float(r.get("amount", 0) or 0)
        except (ValueError, TypeError):
            amount = 0.0
        try:
            match_confidence = float(r.get("matchConfidence", 0) or 0)
        except (ValueError, TypeError):
            match_confidence = 0.0
        if min_date and d:
            date_delta = (d - min_date).days
        else:
            date_delta = 0
        features.append([amount, match_confidence, date_delta])

    X = np.array(features)
    model = IsolationForest(random_state=42)
    preds = model.fit_predict(X)
    scores = -model.decision_function(X)

    result = []
    for r, pred, score in zip(records, preds, scores):
        enriched = dict(r)
        enriched["flagged"] = bool(pred == -1)
        enriched["anomalyScore"] = float(score)
        result.append(enriched)
    return result


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Flag anomalous transactions")
    parser.add_argument("json_file", help="Path to JSON file with transaction records")
    args = parser.parse_args()

    with open(args.json_file, "r", encoding="utf-8") as f:
        records = json.load(f)

    flagged = flag_anomalies(records)
    json.dump(flagged, sys.stdout, indent=2, default=str)
    print()
