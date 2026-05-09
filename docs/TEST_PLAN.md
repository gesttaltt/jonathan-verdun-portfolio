# Master Test Plan: Jonathan Verdun Portfolio

**Version:** 1.0.0  
**Status:** Approved  
**Reference:** ISTQB CTFL Standards

---

## 1. Introduction

This Master Test Plan (MTP) defines the strategic approach to quality assurance for the Jonathan Verdun Portfolio project. The goal is to ensure a high-performance, accessible, and technically resilient user experience through deterministic quality gates.

## 2. Test Objectives

- Achieve 100% statement and branch coverage on core domain logic.
- Ensure 100% compliance with WCAG 2.1 AA accessibility standards.
- Verify SEO and performance thresholds via automated Lighthouse CI.
- Validate internationalization (i18n) parity between English and Spanish locales.

## 3. Test Levels & Scope

### 3.1 Unit Testing (White-box)

- **Tool:** Jest
- **Focus:** Isolated component logic, utility functions, and contract data.
- **Criteria:** 100% logic coverage.

### 3.2 Integration Testing

- **Tool:** Jest / React Testing Library
- **Focus:** Service-to-component interaction, i18n context synchronization, and terminal command processing.

### 3.3 System Testing (E2E)

- **Tool:** Playwright
- **Focus:** Critical user paths, cross-browser compatibility, and mobile responsiveness.

### 3.4 Regression Testing

- **Tool:** GitHub Actions (CI)
- **Focus:** Ensuring that new hardening refinements do not break existing functionality.

## 4. Test Types

### 4.1 Functional Testing (Black-box)

- Verification of terminal commands, navigation, and content rendering across locales.

### 4.2 Non-Functional Testing

- **Performance:** Automated Lighthouse audits (Target score > 0.9).
- **Accessibility:** Automated axe-core scans integrated into Playwright suites.
- **Security:** Dependency auditing (`npm audit`) and secure Nginx header verification.

## 5. Entry & Exit Criteria

### 5.1 Entry Criteria

- Code passes static analysis (ESLint) and type checking (TSC).
- Environment variables are validated via `validate-env.mjs`.

### 5.2 Exit Criteria (Quality Gates)

- **Coverage:** 100% Statements / 100% Branches.
- **Accessibility:** 0 detectable WCAG 2.1 AA violations.
- **CI Status:** Fully green GitHub Actions pipeline.
- **Security:** 0 high-severity vulnerabilities.

## 6. Test Deliverables

- [x] Master Test Plan (This document)
- [x] Traceability Matrix (mapping requirements to cases)
- [x] Automated Test Execution Records (GitHub Actions Logs)
- [x] Quality Transparency Dashboard (/quality)

---

_Authorized by Jonathan Verdun — Quality Architect_
