# Research Brief: Payment Method Strategy for Turkish E-commerce Rollout

## 1. Market Fit & Target Market Preferences

The Turkish e-commerce market is highly dynamic and characterized by a sophisticated credit card ecosystem. To succeed in a rollout, the platform must cater to deep-seated consumer habits.

### Key Payment Methods
1.  **Credit/Debit Cards (Essential):** Standard card payments are the primary driver of e-commerce. Support for local card schemes (Troy) alongside Visa and Mastercard is mandatory.
2.  **Installments (Taksit) (Critical):** This is perhaps the most unique and essential feature. Turkish consumers expect to be able to split payments into 2-12 installments at checkout, often with specific bank-specific campaigns (e.g., Bonus, Maximum, World, Axess).
3.  **3D Secure (Mandatory/Standard):** Highly recommended and often mandatory by PSPs for risk mitigation. Consumers are accustomed to the OTP (One Time Password) flow.
4.  **Bank Transfer / EFT / Havale (Essential for MVP):** Still widely used for high-value items or by customers who are wary of card usage online. Manual reconciliation is common but can be automated via some PSPs.
5.  **Digital Wallets (Optional for MVP):** BKM Express is the local leader. iyzico has its own wallet (iyzipay). These are nice-to-have but not critical for day-one rollout.

### Merchant & Admin Expectations
*   **Settlement Tracking:** Merchants expect clear visibility into when funds will hit their bank accounts (typically T+1 to T+7 depending on the provider).
*   **Refund Management:** Full and partial refunds directly from the admin panel.
*   **Installment Configuration:** Ability to choose which installment options to offer and whether to pass the interest cost to the customer or absorb it.

---

## 2. Turkish E-commerce Suitability

### Local Expectations
*   **Installment Support:** If a platform doesn't offer installments, it will likely see a 30-50% drop in conversion for higher-ticket items.
*   **Troy Card Support:** As the national card scheme, Troy support is increasingly important for compliance and market reach.

### Compliance & Risk
*   **Central Bank of Turkey (CBRT) & BRSA:** All payment providers must be licensed. Using a licensed PSP like iyzico or PayTR handles the bulk of compliance (PCI-DSS) for the platform.
*   **KYC/KYB:** Merchant onboarding requires significant documentation (Tax plate, signature circular, trade registry gazette).

---

## 3. Provider Comparison

| Feature | iyzico (PayU) | PayTR | Stripe |
| :--- | :--- | :--- | :--- |
| **Market Suitability** | High (Market Leader) | High (Competitive) | Low (Not fully active in TR) |
| **API Quality** | Excellent, RESTful | Good, slightly older style | Industry Gold Standard |
| **Installment Support** | Comprehensive (All banks) | Comprehensive | None (for TR banks) |
| **3D Secure** | Native support | Native support | Native support |
| **Sandbox Quality** | Very good | Functional | Excellent |
| **Onboarding Friction** | Moderate (Digital) | Moderate (Digital) | N/A (Cannot settle TRY locally) |
| **Pricing** | Competitive (~2-3% + fixed) | Aggressive (Often lower than iyzico) | High (International rates) |

### Recommendation: **iyzico** or **PayTR**
*   **iyzico** is recommended for its developer-friendly documentation, modern API, and strong brand trust in Turkey.
*   **PayTR** is a strong alternative if the primary driver is lower commission rates and aggressive merchant acquisition.
*   **Stripe** is currently **not recommended** for a local Turkish rollout as they do not provide local TRY settlement to Turkish bank accounts for local entities, making installments impossible.

---

## 4. Product & Architecture Implications

### Provider-Agnostic Module (Abstraction Layer)
**Recommendation:** Yes, design an abstraction layer.
The Turkish PSP market is competitive. Merchants often switch providers based on commission rates.
*   **Interface:** Define a `PaymentGateway` interface with methods like `initializePayment()`, `handleCallback()`, `refund()`.
*   **Adapters:** Create `IyzicoAdapter` and `PayTRAdapter`.

### Transaction States
The system should support at least:
*   `PENDING`: Initial state.
*   `AWAITING_3DS`: Redirected to bank.
*   `AUTHORIZED`: Success, funds held.
*   `CAPTURED`: Funds settled (common in TR to skip separate Auth/Capture).
*   `FAILED`: Payment rejected.
*   `REFUNDED / PARTIALLY_REFUNDED`: Post-purchase states.

### Admin/Backoffice Requirements
*   **Transaction Dashboard:** View all payments with their PSP-specific reference IDs.
*   **Reconciliation Report:** Daily/Weekly exports to match order IDs with bank settlements.
*   **Manual Reconciliation Tool:** For Havale/EFT orders where the admin marks it as paid after checking bank records.

---

## 5. MVP Recommendation

### Phase 1 (MVP)
*   **Provider:** iyzico (due to documentation and ease of setup).
*   **Methods:**
    *   Credit/Debit Cards (Visa/MC/Troy).
    *   Installments (taksit) for major banks.
    *   3D Secure (mandatory flow).
    *   Manual Bank Transfer (Havale/EFT) with a simple admin toggle.
*   **Integration:** Direct integration using iyzico’s Hosted Checkout or iyzico Responsive Form (minimizes PCI-DSS burden).

### Phase 2 (Enhancements)
*   Alternative Wallets (iyzico wallet, BKM Express).
*   Automated Bank Transfer reconciliation (via API).
*   Switching to the Abstraction Layer if multiple PSPs are needed.

---

## 6. Risks, Assumptions, and Open Questions

### Risks
*   **Currency Volatility:** Prices and commissions need to be calculated carefully in TRY.
*   **Regulatory Changes:** Sudden changes by CBRT regarding installment limits on certain categories (e.g., electronics).

### Assumptions
*   The business entity is a registered Turkish company (Limited or Anonim Şirket).
*   The platform will handle TRY as the primary currency.

### Open Questions
*   Will the platform support multi-currency/international sales in the future? (Affects PSP choice).
*   What is the specific product category? (Some categories have restricted installment options).
