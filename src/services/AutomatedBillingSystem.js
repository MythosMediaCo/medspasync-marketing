import { API_BASE_URL } from '../constants';

class AutomatedBillingSystem {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/billing`;
    this.stripe = null;
    this.subscriptions = new Map();
    this.invoices = new Map();
    this.paymentMethods = new Map();
    this.billingEvents = new Map();
    
    // Billing statuses
    this.billingStatuses = {
      ACTIVE: 'active',
      PAST_DUE: 'past_due',
      CANCELED: 'canceled',
      UNPAID: 'unpaid',
      TRIAL: 'trial',
      PAUSED: 'paused'
    };

    // Plan tiers
    this.planTiers = {
      STARTER: 'starter',
      PROFESSIONAL: 'professional',
      ENTERPRISE: 'enterprise',
      PREMIUM: 'premium'
    };

    // Billing events
    this.billingEvents = {
      SUBSCRIPTION_CREATED: 'subscription.created',
      SUBSCRIPTION_UPDATED: 'subscription.updated',
      SUBSCRIPTION_CANCELED: 'subscription.canceled',
      INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
      INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
      CUSTOMER_SUBSCRIPTION_TRIAL_ENDING: 'customer.subscription.trial_will_end',
      CUSTOMER_SUBSCRIPTION_DELETED: 'customer.subscription.deleted'
    };

    // Initialize Stripe
    this.initializeStripe();
  }

  /**
   * Initialize Stripe integration
   */
  initializeStripe() {
    // Load Stripe.js
    if (typeof window !== 'undefined' && window.Stripe) {
      this.stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    }
  }

  /**
   * Create a new subscription
   * @param {Object} subscriptionData - Subscription data
   * @returns {Promise<Object>} Created subscription
   */
  async createSubscription(subscriptionData) {
    try {
      const response = await fetch(`${this.baseUrl}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...subscriptionData,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create subscription: ${response.statusText}`);
      }

      const subscription = await response.json();
      
      // Cache subscription
      this.subscriptions.set(subscription.id, subscription);
      
      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  /**
   * Update subscription
   * @param {string} subscriptionId - Subscription ID
   * @param {Object} updates - Subscription updates
   * @returns {Promise<Object>} Updated subscription
   */
  async updateSubscription(subscriptionId, updates) {
    try {
      const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...updates,
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update subscription: ${response.statusText}`);
      }

      const subscription = await response.json();
      
      // Update cache
      this.subscriptions.set(subscriptionId, subscription);
      
      return subscription;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   * @param {string} subscriptionId - Subscription ID
   * @param {Object} options - Cancellation options
   * @returns {Promise<Object>} Cancelled subscription
   */
  async cancelSubscription(subscriptionId, options = {}) {
    try {
      const {
        cancelAtPeriodEnd = true,
        reason = null,
        feedback = null
      } = options;

      const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          cancelAtPeriodEnd,
          reason,
          feedback,
          canceledAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel subscription: ${response.statusText}`);
      }

      const subscription = await response.json();
      
      // Update cache
      this.subscriptions.set(subscriptionId, subscription);
      
      return subscription;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  /**
   * Automatically upgrade subscription based on usage
   * @param {string} customerId - Customer ID
   * @param {Object} usageData - Usage data
   * @returns {Promise<Object>} Upgrade result
   */
  async autoUpgradeSubscription(customerId, usageData) {
    try {
      const response = await fetch(`${this.baseUrl}/auto-upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          usageData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to auto-upgrade subscription: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update cache if subscription was upgraded
      if (result.subscription) {
        this.subscriptions.set(result.subscription.id, result.subscription);
      }
      
      return result;
    } catch (error) {
      console.error('Error auto-upgrading subscription:', error);
      throw error;
    }
  }

  /**
   * Automatically downgrade subscription based on usage
   * @param {string} customerId - Customer ID
   * @param {Object} usageData - Usage data
   * @returns {Promise<Object>} Downgrade result
   */
  async autoDowngradeSubscription(customerId, usageData) {
    try {
      const response = await fetch(`${this.baseUrl}/auto-downgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          usageData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to auto-downgrade subscription: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update cache if subscription was downgraded
      if (result.subscription) {
        this.subscriptions.set(result.subscription.id, result.subscription);
      }
      
      return result;
    } catch (error) {
      console.error('Error auto-downgrading subscription:', error);
      throw error;
    }
  }

  /**
   * Create invoice
   * @param {Object} invoiceData - Invoice data
   * @returns {Promise<Object>} Created invoice
   */
  async createInvoice(invoiceData) {
    try {
      const response = await fetch(`${this.baseUrl}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...invoiceData,
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create invoice: ${response.statusText}`);
      }

      const invoice = await response.json();
      
      // Cache invoice
      this.invoices.set(invoice.id, invoice);
      
      return invoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  /**
   * Process payment
   * @param {string} invoiceId - Invoice ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(invoiceId, paymentData) {
    try {
      const response = await fetch(`${this.baseUrl}/invoices/${invoiceId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...paymentData,
          processedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to process payment: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update invoice cache
      if (result.invoice) {
        this.invoices.set(invoiceId, result.invoice);
      }
      
      return result;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  /**
   * Handle payment failure
   * @param {string} invoiceId - Invoice ID
   * @param {Object} failureData - Failure data
   * @returns {Promise<Object>} Failure handling result
   */
  async handlePaymentFailure(invoiceId, failureData) {
    try {
      const response = await fetch(`${this.baseUrl}/invoices/${invoiceId}/payment-failure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...failureData,
          failedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to handle payment failure: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update invoice cache
      if (result.invoice) {
        this.invoices.set(invoiceId, result.invoice);
      }
      
      return result;
    } catch (error) {
      console.error('Error handling payment failure:', error);
      throw error;
    }
  }

  /**
   * Calculate prorated billing
   * @param {string} subscriptionId - Subscription ID
   * @param {Object} changes - Billing changes
   * @returns {Promise<Object>} Prorated billing calculation
   */
  async calculateProratedBilling(subscriptionId, changes) {
    try {
      const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}/prorate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          changes,
          calculatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate prorated billing: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating prorated billing:', error);
      throw error;
    }
  }

  /**
   * Optimize pricing
   * @param {string} customerId - Customer ID
   * @param {Object} usageData - Usage data
   * @returns {Promise<Object>} Pricing optimization result
   */
  async optimizePricing(customerId, usageData) {
    try {
      const response = await fetch(`${this.baseUrl}/pricing/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          usageData,
          optimizedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to optimize pricing: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error optimizing pricing:', error);
      throw error;
    }
  }

  /**
   * Recover failed payments
   * @param {string} customerId - Customer ID
   * @param {Object} options - Recovery options
   * @returns {Promise<Object>} Payment recovery result
   */
  async recoverFailedPayments(customerId, options = {}) {
    try {
      const {
        maxAttempts = 3,
        retryInterval = 24, // hours
        paymentMethod = null
      } = options;

      const response = await fetch(`${this.baseUrl}/payment-recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          maxAttempts,
          retryInterval,
          paymentMethod,
          recoveryStartedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to recover payments: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error recovering failed payments:', error);
      throw error;
    }
  }

  /**
   * Get subscription details
   * @param {string} subscriptionId - Subscription ID
   * @returns {Promise<Object>} Subscription details
   */
  async getSubscription(subscriptionId) {
    try {
      // Check cache first
      if (this.subscriptions.has(subscriptionId)) {
        return this.subscriptions.get(subscriptionId);
      }

      const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch subscription: ${response.statusText}`);
      }

      const subscription = await response.json();
      
      // Cache subscription
      this.subscriptions.set(subscriptionId, subscription);
      
      return subscription;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      throw error;
    }
  }

  /**
   * Get customer billing history
   * @param {string} customerId - Customer ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Billing history
   */
  async getBillingHistory(customerId, options = {}) {
    try {
      const {
        limit = 50,
        offset = 0,
        includeInvoices = true,
        includeSubscriptions = true
      } = options;

      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        includeInvoices: includeInvoices.toString(),
        includeSubscriptions: includeSubscriptions.toString()
      });

      const response = await fetch(`${this.baseUrl}/customers/${customerId}/billing-history?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch billing history: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching billing history:', error);
      throw error;
    }
  }

  /**
   * Get upcoming invoice
   * @param {string} subscriptionId - Subscription ID
   * @returns {Promise<Object>} Upcoming invoice
   */
  async getUpcomingInvoice(subscriptionId) {
    try {
      const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}/upcoming-invoice`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch upcoming invoice: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming invoice:', error);
      throw error;
    }
  }

  /**
   * Add payment method
   * @param {string} customerId - Customer ID
   * @param {Object} paymentMethodData - Payment method data
   * @returns {Promise<Object>} Added payment method
   */
  async addPaymentMethod(customerId, paymentMethodData) {
    try {
      const response = await fetch(`${this.baseUrl}/customers/${customerId}/payment-methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...paymentMethodData,
          addedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add payment method: ${response.statusText}`);
      }

      const paymentMethod = await response.json();
      
      // Cache payment method
      this.paymentMethods.set(paymentMethod.id, paymentMethod);
      
      return paymentMethod;
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  }

  /**
   * Update payment method
   * @param {string} paymentMethodId - Payment method ID
   * @param {Object} updates - Payment method updates
   * @returns {Promise<Object>} Updated payment method
   */
  async updatePaymentMethod(paymentMethodId, updates) {
    try {
      const response = await fetch(`${this.baseUrl}/payment-methods/${paymentMethodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...updates,
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update payment method: ${response.statusText}`);
      }

      const paymentMethod = await response.json();
      
      // Update cache
      this.paymentMethods.set(paymentMethodId, paymentMethod);
      
      return paymentMethod;
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  }

  /**
   * Remove payment method
   * @param {string} paymentMethodId - Payment method ID
   * @returns {Promise<boolean>} Success status
   */
  async removePaymentMethod(paymentMethodId) {
    try {
      const response = await fetch(`${this.baseUrl}/payment-methods/${paymentMethodId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to remove payment method: ${response.statusText}`);
      }

      // Remove from cache
      this.paymentMethods.delete(paymentMethodId);
      
      return true;
    } catch (error) {
      console.error('Error removing payment method:', error);
      throw error;
    }
  }

  /**
   * Get billing analytics
   * @param {Object} options - Analytics options
   * @returns {Promise<Object>} Billing analytics
   */
  async getBillingAnalytics(options = {}) {
    try {
      const {
        timeRange = '30d',
        includeMetrics = true,
        includeTrends = true
      } = options;

      const params = new URLSearchParams({
        timeRange,
        includeMetrics: includeMetrics.toString(),
        includeTrends: includeTrends.toString()
      });

      const response = await fetch(`${this.baseUrl}/analytics?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch billing analytics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching billing analytics:', error);
      throw error;
    }
  }

  /**
   * Export billing data
   * @param {Object} options - Export options
   * @returns {Promise<Blob>} Exported data
   */
  async exportBillingData(options = {}) {
    try {
      const {
        format = 'csv',
        timeRange = '90d',
        includeInvoices = true,
        includeSubscriptions = true,
        includePayments = true
      } = options;

      const params = new URLSearchParams({
        format,
        timeRange,
        includeInvoices: includeInvoices.toString(),
        includeSubscriptions: includeSubscriptions.toString(),
        includePayments: includePayments.toString()
      });

      const response = await fetch(`${this.baseUrl}/export?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to export billing data: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting billing data:', error);
      throw error;
    }
  }

  /**
   * Get authentication token
   * @returns {string} Auth token
   */
  getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Clear cache for a specific customer
   * @param {string} customerId - Customer ID
   */
  clearCustomerCache(customerId) {
    // Clear subscriptions for this customer
    this.subscriptions.forEach((subscription, id) => {
      if (subscription.customerId === customerId) {
        this.subscriptions.delete(id);
      }
    });

    // Clear invoices for this customer
    this.invoices.forEach((invoice, id) => {
      if (invoice.customerId === customerId) {
        this.invoices.delete(id);
      }
    });

    // Clear payment methods for this customer
    this.paymentMethods.forEach((method, id) => {
      if (method.customerId === customerId) {
        this.paymentMethods.delete(id);
      }
    });
  }

  /**
   * Clear all cache
   */
  clearAllCache() {
    this.subscriptions.clear();
    this.invoices.clear();
    this.paymentMethods.clear();
    this.billingEvents.clear();
  }
}

// Create singleton instance
const automatedBillingSystem = new AutomatedBillingSystem();

export default automatedBillingSystem; 