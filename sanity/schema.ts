import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { category } from "./category";
import { general } from "./general";
import { aboutUsPage } from "./aboutUsPage";
import { termsPage } from "./termsPage";
import { returnAndExchangePolicyPage } from "./returnAndExchangePolicyPage";
import { contactUsPage } from "./contactUsPage";
import { shippingPolicyPage } from "./shippingPolicyPage";
import { privacyPolicyPage } from "./privacyPolicyPage";
import { dashboard } from "./dashboard";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
          product,
          category, 
          general, 
          aboutUsPage, 
          termsPage, 
          returnAndExchangePolicyPage, 
          contactUsPage,
          shippingPolicyPage,
          privacyPolicyPage,
          userDashboardPage,
        ],
};
