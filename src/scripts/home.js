import { loadHeaderFooter } from "./utils.mjs";
import FeatureData from "./FeatureData.mjs";
import Features from "./Features.mjs";

loadHeaderFooter();

const featureData = new FeatureData("data/features.json");
const features = new Features("#features",featureData);
features.init();