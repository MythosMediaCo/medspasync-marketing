"""Fuzzy matching of client records using SentenceTransformer."""

from __future__ import annotations

from typing import List, Dict, Any

from sentence_transformers import SentenceTransformer, util
import torch

import sys

def _prep_text(record: Dict[str, Any]) -> str:
    """Return lowercased text combining name and email."""
    name = (record.get("name") or "").strip().lower()
    email = (record.get("email") or "").strip().lower()
    return f"{name} {email}".strip()


def match_records(
    pos_list: List[Dict[str, Any]],
    rewards_list: List[Dict[str, Any]],
    *,
    top_n: int = 3,
    threshold: float = 0.85,
) -> List[Dict[str, Any]]:
    """Match POS records with rewards data using semantic similarity.

    Parameters
    ----------
    pos_list : list of dict
        Records from the point-of-sale system.
    rewards_list : list of dict
        Records from the rewards system.
    top_n : int, optional
        Number of top matches to consider for each POS entry.
    threshold : float, optional
        Similarity threshold to auto-match.

    Returns
    -------
    list of dict
        Matched records with similarity score and status.
    """
    if not pos_list:
        return []

    model = SentenceTransformer("all-MiniLM-L6-v2")
    pos_texts = [_prep_text(r) for r in pos_list]
    reward_texts = [_prep_text(r) for r in rewards_list]

    pos_emb = model.encode(pos_texts, convert_to_tensor=True)
    reward_emb = model.encode(reward_texts, convert_to_tensor=True)

    sim_matrix = util.cos_sim(pos_emb, reward_emb)

    results = []
    for i, pos_record in enumerate(pos_list):
        similarities = sim_matrix[i]
        if isinstance(similarities, torch.Tensor):
            similarities = similarities.cpu()
        top_indices = torch.topk(similarities, k=min(top_n, len(rewards_list))).indices
        best_idx = int(top_indices[0]) if len(top_indices) > 0 else None
        best_score = float(similarities[best_idx]) if best_idx is not None else 0.0
        matched_reward = rewards_list[best_idx] if best_idx is not None else None

        status: str
        if best_idx is None:
            status = "unmatched"
        elif best_score >= threshold:
            status = "matched"
        else:
            status = "review"

        results.append(
            {
                "pos": pos_record,
                "matchedReward": matched_reward,
                "score": best_score,
                "status": status,
            }
        )

    return results


if __name__ == "__main__":
    import json
    import argparse

    parser = argparse.ArgumentParser(description="Match POS and reward records")
    parser.add_argument("pos_json", help="Path to POS records JSON file")
    parser.add_argument("rewards_json", help="Path to rewards records JSON file")
    parser.add_argument("-n", "--top", type=int, default=3, help="Number of top matches to return")
    parser.add_argument("-t", "--threshold", type=float, default=0.85, help="Match threshold")
    args = parser.parse_args()

    with open(args.pos_json, "r", encoding="utf-8") as f:
        pos_records = json.load(f)
    with open(args.rewards_json, "r", encoding="utf-8") as f:
        rewards_records = json.load(f)

    matched = match_records(pos_records, rewards_records, top_n=args.top, threshold=args.threshold)
    json.dump(matched, sys.stdout, indent=2, default=str)
    print()
