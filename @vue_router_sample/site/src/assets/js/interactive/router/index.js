import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../contents/components/main/main-contents'
import Creator from '../contents/components/creator/creator-contents'
import Business from '../contents/components/business/business-contents'
import Esports from '../contents/components/esports/esports-contents'
import About from '../contents/components/about/about-contents'
import Careers from '../contents/components/careers/careers-contents'
import News from '../contents/components/news/news-contents'
import ApplyCreator from '../contents/components/apply-creator/apply-creator-contents'
import PrivacyPolicy from '../contents/components/privacy-policy/privacy-policy-contents'
import IrNotice from '../contents/components/ir-notice/ir-notice-contents'
import Error from '../contents/components/error/error-contents'





export default new VueRouter({
    mode: 'history',
    fallback: false,
  routes: [
    { path: "/index.html", component: Main},
    { path: window.GlobalVars.CATE_000_MAIN, component: Main},
    { path: window.GlobalVars.CATE_100_CREATOR, redirect: window.GlobalVars.CATE_110_CREATOR_CREATORS},
    { path: window.GlobalVars.CATE_110_CREATOR_CREATORS, component: Creator},
    { path: window.GlobalVars.CATE_111_CREATOR_CREATORS_PROFILE, component: Creator},
    { path: window.GlobalVars.CATE_120_CREATOR_AGENCY, component: Creator},
    { path: window.GlobalVars.CATE_200_BUSINESS, redirect: window.GlobalVars.CATE_210_BUSINESS_BRAND},
    { path: window.GlobalVars.CATE_210_BUSINESS_BRAND, component: Business},
    { path: window.GlobalVars.CATE_211_BUSINESS_BRAND_DETAIL, component: Business},
    { path: window.GlobalVars.CATE_212_BUSINESS_BRAND_CONTACT, component: Business},
    { path: window.GlobalVars.CATE_220_BUSINESS_IP, component: Business},
    { path: window.GlobalVars.CATE_221_BUSINESS_IP_DETAIL, component: Business},
    { path: window.GlobalVars.CATE_222_BUSINESS_IP_CONTACT, component: Business},
    { path: window.GlobalVars.CATE_300_ABOUT, component: About},
    { path: window.GlobalVars.CATE_400_CAREERS, redirect: window.GlobalVars.CATE_410_CAREERS_AUGUST},
    { path: window.GlobalVars.CATE_410_CAREERS_AUGUST, component: Careers},
    { path: window.GlobalVars.CATE_411_CAREERS_AUGUST_DETAIL, component: Careers},
    { path: window.GlobalVars.CATE_412_CAREERS_AUGUST_APPLY, component: Careers},
    { path: window.GlobalVars.CATE_420_CAREERS_CREATOR, component: Careers},
    { path: window.GlobalVars.CATE_421_CAREERS_CREATOR_DETAIL, component: Careers},
    { path: window.GlobalVars.CATE_422_CAREERS_CREATOR_APPLY, component: Careers},
    { path: window.GlobalVars.CATE_500_NEWS, component: News},
    { path: window.GlobalVars.CATE_510_NEWS_DETAIL, component: News},
    { path: window.GlobalVars.CATE_600_APPLY_CREATOR, component: ApplyCreator},
    { path: window.GlobalVars.CATE_700_PRIVACY_POLICY, component: PrivacyPolicy},
    { path: window.GlobalVars.CATE_800_ESPORTS, component: Esports},
    { path: window.GlobalVars.CATE_900_ERROR, component: Error},
    { path: window.GlobalVars.CATE_1000_IR_NOTICE, component: IrNotice},
    { path: window.GlobalVars.CATE_1001_IR_NOTICE_DETAIL, component: IrNotice},
    { path: '*', component: Error}
  ],
})

Vue.use(VueRouter)
