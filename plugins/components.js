import Vue from "vue";
import Page from "~/components/Page.vue";
import InteriorPage from "~/components/InteriorPage.vue";
import EventPage from "~/components/EventPage.vue";
import Hero from "~/components/blocks/Hero.vue";
import TwoColumnImageRight from "~/components/blocks/TwoColumnImageRight.vue";
import RichTextBlock from "~/components/blocks/RichTextBlock.vue";
import InteriorTitle from "~/components/blocks/InteriorTitle";
import FeaturedEvents from "~/components/blocks/FeaturedEvents.vue";
import FeaturedLinks from "~/components/blocks/FeaturedLinks.vue";
import CallToAction from "~/components/blocks/CallToAction";
import TwoColumnImageLeft from "~/components/blocks/TwoColumnImageLeft.vue";

Vue.component("page", Page);
Vue.component("InteriorPage", InteriorPage);
Vue.component("EventPage", EventPage);
Vue.component("Hero", Hero);
Vue.component("TwoColumnImageRight", TwoColumnImageRight);
Vue.component("RichTextBlock", RichTextBlock);
Vue.component("InteriorTitle", InteriorTitle);
Vue.component("FeaturedLinks", FeaturedLinks);
Vue.component("CallToAction", CallToAction);
Vue.component("TwoColumnImageLeft", TwoColumnImageLeft);
Vue.component("FeaturedEvents", FeaturedEvents);
