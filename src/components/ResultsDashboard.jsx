import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  Download,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';

const ResultsDashboard = ({ results, onManualReview, onExport }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [selectedMatches, setSelectedMatches] = useState([]);

  // Process results data
  const summary = results?.summary || {
    total: 0,
    auto_accept: 0,
    manual_review: 0,
    likely_no_match: 0,
    auto_accept_rate_percent: 0
  };

  const autoAcceptedMatches = results?.results?.filter(r => r.recommendation === 'Auto-Accept') || [];
  const manualReviewMatches = results?.results?.filter(r => r.recommendation === 'Manual Review') || [];
  const noMatches = results?.results?.filter(r => r.recommendation === 'Likely No Match') || [];

  const SummaryCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color === 'border-green-200' ? 'bg-green-100' : 
                                          color === 'border-yellow-200' ? 'bg-yellow-100' : 
                                          color === 'border-red-200' ? 'bg-red-100' : 'bg-blue-100'}`}>
          <Icon className={`w-6 h-6 ${color === 'border-green-200' ? 'text-green-600' : 
                                     color === 'border-yellow-200' ? 'text-yellow-600' : 
                                     color === 'border-red-200' ? 'text-red-600' : 'text-blue-600'}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-600 font-medium">{trend}</span>
          <span className="text-gray-500 ml-1">vs manual process</span>
        </div>
      )}
    </div>
  );

  const ConfidenceIndicator = ({ confidence, recommendation }) => {
    const getConfidenceColor = (conf) => {
      if (conf >= 0.95) return 'text-green-600 bg-green-100';
      if (conf >= 0.8) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    const getRecommendationBadge = (rec) => {
      if (rec === 'Auto-Accept') return 'bg-green-100 text-green-800';
      if (rec === 'Manual Review') return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    };

    return (
      <div className="flex items-center gap-2">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(confidence)}`}>
          {(confidence * 100).toFixed(1)}%
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRecommendationBadge(recommendation)}`}>
          {recommendation}
        </div>
      </div>
    );
  };

  const MatchDetailsRow = ({ match, index }) => {
    const isExpanded = expandedMatch === index;
    
    return (
      <div className="border border-gray-200 rounded-lg mb-4">
        <div className="p-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedMatches.includes(index)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMatches([...selectedMatches, index]);
                } else {
                  setSelectedMatches(selectedMatches.filter(i => i !== index));
                }
              }}
              className="rounded border-gray-300"
            />
            <div>
              <p className="font-medium text-gray-900">
                {match.reward_transaction?.customer_name || 'Unknown Customer'}
              </p>
              <p className="text-sm text-gray-500">
                {match.reward_transaction?.service || 'Unknown Service'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ConfidenceIndicator 
              confidence={match.match_probability || 0}
              recommendation={match.recommendation || 'Unknown'}
            />
            <button
              onClick={() => setExpandedMatch(isExpanded ? null : index)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reward Transaction */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-500" />
                  Reward Transaction
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">{match.reward_transaction?.customer_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-medium">{match.reward_transaction?.service || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium">${match.reward_transaction?.amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{match.reward_transaction?.date || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* POS Transaction */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  POS Transaction
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">{match.pos_transaction?.customer_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-medium">{match.pos_transaction?.service || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium">${match.pos_transaction?.amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{match.pos_transaction?.date || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Analysis */}
            {match.feature_analysis && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">AI Analysis Breakdown</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(match.feature_analysis).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {typeof value === 'number' ? (value * 100).toFixed(0) + '%' : value ? '✓' : '✗'}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons for Manual Review */}
            {match.recommendation === 'Manual Review' && (
              <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => onManualReview(match.id || index, 'approve', '')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Match
                </button>
                <button
                  onClick={() => onManualReview(match.id || index, 'reject', '')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Match
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const TabButton = ({ id, label, count, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        active 
          ? 'bg-blue-100 text-blue-700 border-blue-200' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label} {count !== undefined && <span className="text-sm">({count})</span>}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          🎉 Reconciliation Complete!
        </h1>
        <p className="text-lg text-gray-600">
          AI processing finished. Review the results below and take action on items requiring attention.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Auto-Accepted"
          value={summary.auto_accept}
          subtitle={`${summary.auto_accept_rate_percent}% of total`}
          icon={CheckCircle}
          color="border-green-200"
          trend={summary.auto_accept > 0 ? "85% time saved" : null}
        />
        <SummaryCard
          title="Manual Review"
          value={summary.manual_review}
          subtitle="Requires attention"
          icon={AlertTriangle}
          color="border-yellow-200"
        />
        <SummaryCard
          title="No Match"
          value={summary.likely_no_match}
          subtitle="Likely unmatched"
          icon={XCircle}
          color="border-red-200"
        />
        <SummaryCard
          title="Total Processed"
          value={summary.total}
          subtitle="Transactions analyzed"
          icon={Users}
          color="border-blue-200"
        />
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-3">
          <TabButton 
            id="summary" 
            label="Summary" 
            active={activeTab === 'summary'} 
          />
          <TabButton 
            id="auto-accepted" 
            label="Auto-Accepted" 
            count={autoAcceptedMatches.length}
            active={activeTab === 'auto-accepted'} 
          />
          <TabButton 
            id="manual-review" 
            label="Manual Review" 
            count={manualReviewMatches.length}
            active={activeTab === 'manual-review'} 
          />
          <TabButton 
            id="unmatched" 
            label="Unmatched" 
            count={noMatches.length}
            active={activeTab === 'unmatched'} 
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onExport('csv')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => onExport('excel')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'summary' && (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Processing Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">✅ Successfully Automated</h4>
                <p className="text-green-700 text-sm">
                  {summary.auto_accept} transactions were automatically matched with 95%+ confidence.
                  This saves approximately {Math.round(summary.auto_accept * 2)} minutes of manual work.
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">⚠️ Needs Attention</h4>
                <p className="text-yellow-700 text-sm">
                  {summary.manual_review} transactions require manual review. 
                  AI confidence was 80-95%, suggesting likely matches needing verification.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">📈 Time Savings</h4>
                <p className="text-blue-700 text-sm">
                  Estimated {Math.round(summary.total * 1.5)} minutes saved compared to manual reconciliation.
                  ROI: ${Math.round(summary.total * 0.75)} in labor cost savings.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Ready to review {summary.manual_review} items requiring attention?
              </p>
              <button
                onClick={() => setActiveTab('manual-review')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Manual Review
              </button>
            </div>
          </div>
        )}

        {activeTab === 'auto-accepted' && (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Auto-Accepted Matches ({autoAcceptedMatches.length})
            </h3>
            <p className="text-gray-600 mb-6">
              These transactions were automatically matched with 95%+ confidence. No action required.
            </p>
            
            {autoAcceptedMatches.length > 0 ? (
              <div className="space-y-4">
                {autoAcceptedMatches.map((match, index) => (
                  <MatchDetailsRow key={index} match={match} index={`auto-${index}`} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No auto-accepted matches found.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'manual-review' && (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Manual Review Queue ({manualReviewMatches.length})
            </h3>
            <p className="text-gray-600 mb-6">
              These transactions have 80-95% confidence. Please review and approve or reject each match.
            </p>
            
            {selectedMatches.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">
                    {selectedMatches.length} items selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        selectedMatches.forEach(index => 
                          onManualReview(index, 'approve', 'Bulk approved')
                        );
                        setSelectedMatches([]);
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Approve Selected
                    </button>
                    <button
                      onClick={() => {
                        selectedMatches.forEach(index => 
                          onManualReview(index, 'reject', 'Bulk rejected')
                        );
                        setSelectedMatches([]);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Reject Selected
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {manualReviewMatches.length > 0 ? (
              <div className="space-y-4">
                {manualReviewMatches.map((match, index) => (
                  <MatchDetailsRow key={index} match={match} index={`manual-${index}`} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No items require manual review.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'unmatched' && (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Unmatched Transactions ({noMatches.length})
            </h3>
            <p className="text-gray-600 mb-6">
              These transactions had low confidence scores (&lt;80%) and likely have no matching pairs.
            </p>
            
            {noMatches.length > 0 ? (
              <div className="space-y-4">
                {noMatches.map((match, index) => (
                  <MatchDetailsRow key={index} match={match} index={`unmatched-${index}`} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <XCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>All transactions were successfully matched!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;