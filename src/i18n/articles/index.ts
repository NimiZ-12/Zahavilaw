/* ----------------------------------------------------------------------------
   The list of published articles. Every entry is client-approved content;
   see docs/seo/articles-content-format.md for the submission flow.

   To publish an article: add its content module in this folder, import it
   here, append it to the array, build, verify, and get the client's
   approval on the staging preview before merging.
---------------------------------------------------------------------------- */

import type { Article } from "./types";
import { resignationAsDismissal } from "./resignation-as-dismissal";
import { rightsAfterDismissal } from "./rights-after-dismissal";
import { dismissalDuringSickLeave } from "./dismissal-during-sick-leave";
import { hearingTimelineAndDocuments } from "./hearing-timeline-and-documents";
import { workplaceBullying } from "./workplace-bullying";
import { howToDismissAnEmployee } from "./how-to-dismiss-an-employee";
import { noticePeriod } from "./notice-period";
import { dismissalLetter } from "./dismissal-letter";
import { coOwnershipDissolution } from "./co-ownership-dissolution";
import { foundersAgreement } from "./founders-agreement";
import { apartmentDeliveryDelay } from "./apartment-delivery-delay";
import { constructionDefects } from "./construction-defects";
import { beforeBuyingAnApartment } from "./before-buying-an-apartment";
import { warningNote } from "./warning-note";
import { capitalGainsSingleApartment } from "./capital-gains-single-apartment";
import { tenantEviction } from "./tenant-eviction";
import { urbanRenewalTenants } from "./urban-renewal-tenants";
import { tama38AfterExpiry } from "./tama-38-after-expiry";
import { farmPlotCapitalization } from "./farm-plot-capitalization";
import { breachOfContractRemedies } from "./breach-of-contract-remedies";
import { warningLetterBeforeLawsuit } from "./warning-letter-before-lawsuit";
import { partnerDispute } from "./partner-dispute";
import { minorityShareholderOppression } from "./minority-shareholder-oppression";
import { piercingTheCorporateVeil } from "./piercing-the-corporate-veil";
import { businessDebtCollection } from "./business-debt-collection";
import { companyFormation } from "./company-formation";
import { securityForCostsCompany } from "./security-for-costs-company";
import { willContest } from "./will-contest";
import { durablePowerOfAttorney } from "./durable-power-of-attorney";
import { inheritanceOrderAndProbate } from "./inheritance-order-and-probate";
import { draftingAWill } from "./drafting-a-will";
import { mutualWill } from "./mutual-will";
import { intestateSuccession } from "./intestate-succession";
import { inheritedApartment } from "./inherited-apartment";
import { guardianshipForElderlyParent } from "./guardianship-for-elderly-parent";
import { estateAdministrator } from "./estate-administrator";
import { prenuptialAgreement } from "./prenuptial-agreement";
import { propertyDivisionInDivorce } from "./property-division-in-divorce";
import { commonLawPartners } from "./common-law-partners";
import { childSupport } from "./child-support";
import { startingDivorceProceedings } from "./starting-divorce-proceedings";
import { divorceAgreement } from "./divorce-agreement";
import { sharedCustody } from "./shared-custody";
import { parentalAlienation } from "./parental-alienation";
import { defamationLawsuit } from "./defamation-lawsuit";
import { defamationDefenses } from "./defamation-defenses";
import { openingAnEnforcementFile } from "./opening-an-enforcement-file";
import { arbitration } from "./arbitration";
import { classAction } from "./class-action";
import { insolvencyProceedings } from "./insolvency-proceedings";
import { statementOfDefense } from "./statement-of-defense";
import { injunctionsAndInterimRelief } from "./injunctions-and-interim-relief";

export type { Article };

export const articles: Article[] = [
  resignationAsDismissal,
  rightsAfterDismissal,
  dismissalDuringSickLeave,
  hearingTimelineAndDocuments,
  workplaceBullying,
  howToDismissAnEmployee,
  noticePeriod,
  dismissalLetter,
  coOwnershipDissolution,
  foundersAgreement,
  apartmentDeliveryDelay,
  constructionDefects,
  beforeBuyingAnApartment,
  warningNote,
  capitalGainsSingleApartment,
  tenantEviction,
  urbanRenewalTenants,
  tama38AfterExpiry,
  farmPlotCapitalization,
  breachOfContractRemedies,
  warningLetterBeforeLawsuit,
  partnerDispute,
  minorityShareholderOppression,
  piercingTheCorporateVeil,
  businessDebtCollection,
  companyFormation,
  securityForCostsCompany,
  willContest,
  durablePowerOfAttorney,
  inheritanceOrderAndProbate,
  draftingAWill,
  mutualWill,
  intestateSuccession,
  inheritedApartment,
  guardianshipForElderlyParent,
  estateAdministrator,
  prenuptialAgreement,
  propertyDivisionInDivorce,
  commonLawPartners,
  childSupport,
  startingDivorceProceedings,
  divorceAgreement,
  sharedCustody,
  parentalAlienation,
  defamationLawsuit,
  defamationDefenses,
  openingAnEnforcementFile,
  arbitration,
  classAction,
  insolvencyProceedings,
  statementOfDefense,
  injunctionsAndInterimRelief,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
