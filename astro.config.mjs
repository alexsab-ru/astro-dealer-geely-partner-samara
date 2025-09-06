import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import sitemap from "@astrojs/sitemap";
import robots from "astro-robots";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';

const legacyNews = [
	// ВЕСЬ список ваших материалов из /about-geely/news/* редиректим на /news/
	'/about-geely/news/avtomobili-brenda-geely-vybiraiut-za-kachestvo-i-nadezhnost/',
	'/about-geely/news/avtomobili-geely-teper-dostupny-dlia-priobreteniia-onlain-na-marketpleise-wildberries/',
	'/about-geely/news/brend-geely-stal-liderom-po-kolichestvu-nagrad-po-itogam-gran-pri-za-rulem-2025/',
	'/about-geely/news/chem-otlichaetsia-geely-atlas-pro-ot-geely-coolray/',
	'/about-geely/news/eksportnye-postavki-geely-auto-prevysili-100-000-avtomobiley-v-2022-godu/',
	'/about-geely/news/eksportnye-prodazhi-krossovera-geely-coolray-prevysili-800-tysyach-avtomobiley/',
	'/about-geely/news/elektricheskii-krossover-geely-ex5-poluchil-5-zvezd-za-bezopasnost-po-sisteme-euro-ncap/',
	'/about-geely/news/emgrand-became-a-three-time-winner-of-the-rating/',
	'/about-geely/news/geely-atlas-poluchil-titul-semeinaia-novinka-goda-po-itogam-premii-novinka-goda-2024-ot-avto-ru/',
	'/about-geely/news/geely-atlas-pro-sravnenie-komplektatsii/',
	'/about-geely/news/geely-auto-opublikovala-esg-otchet-za-2024-god/',
	'/about-geely/news/geely-auto-predstavliaet-revoliutsionnye-razrabotki-v-oblasti-tekhnologii-iskusstvennogo-intellekta-i-bezopasnosti-na-shankhaiskom-avtosalone-2025/',
	'/about-geely/news/geely-coolray-pobeditel-premii-vnedorozhnik-goda-2024/',
	'/about-geely/news/geely-coolray-v-trade-in/',
	'/about-geely/news/geely-emgrand-i-geely-preface-voshli-v-top-3-reitinga-kachestva-avtomobilei-china-automobile-quality-ranking/',
	'/about-geely/news/geely-emgrand-surpassed-4-million-mark/',
	'/about-geely/news/geely-ex5-sales-exceed-150000/',
	'/about-geely/news/geely-ex5-stal-obladatelem-prestizhnoi-nagrady-red-dot-award-za-vydaiushchiisia-dizain/',
	'/about-geely/news/geely-galaxy-a7-has-passed-a-24-hour-test/',
	'/about-geely/news/geely-has-set-a-new-security-standard/',
	'/about-geely/news/geely-holding-group-innovation-company-in-hybrid-cars/',
	'/about-geely/news/geely-holding-group-launched-11-satellites-into-space/',
	'/about-geely/news/geely-monjaro-pobedil-v-dvukh-nominatsiiakh-po-itogam-golosovaniia-na-portale-avto-mail/',
	'/about-geely/news/geely-monjaro-sravnenie-komplektatsii/',
	'/about-geely/news/geely-monjaro-zavoeval-titul-avtomobil-goda-v-ramkakh-natsional-noi-premii-ekspertov-avtomobil-nogo-biznesa-top-5-avto/',
	'/about-geely/news/geely-ob-iavliaet-o-starte-prodazh-avtomobilei-na-onlain-ploshchadke-ozon/',
	'/about-geely/news/geely-ob-iavliaet-o-starte-prodazh-novogo-elektricheskogo-krossovera-geely-ex5-na-rossiiskom-rynke/',
	'/about-geely/news/geely-ob-iavliaet-tseny-na-novyi-elektricheskii-krossover-geely-ex5-dlia-rossiiskogo-rynkageely-ob-iavliaet-tseny-na-novyi-elektricheskii-krossover-geely-ex5-dlia-rossiiskogo-rynka/',
	'/about-geely/news/geely-ob-iavliaet-tseny-na-novyi-krossover-geely-atlas-s-polnym-privodom/',
	'/about-geely/news/geely-obiavlyaet-komplektatsii-i-tseny-krossovera-geely-monjaro/',
	'/about-geely/news/geely-obyavlyaet-tseny-i-start-priema-zakazov-na-novuyu-versiyu-krossovera-atlas-pro/',
	'/about-geely/news/geely-obyavlyaet-tseny-i-start-priema-zakazov-na-novuyu-versiyu-tugella/',
	'/about-geely/news/geely-obyavlyaet-tseny-na-krossover-geely-atlas-novogo-pokoleniya/',
	'/about-geely/news/geely-obyavlyaet-tseny-na-novyy-7-mestnyy-krossover-okavango-v-rossii/',
	'/about-geely/news/geely-oderzhala-pobedu-v-reitinge-udovletvorennosti-dilerov-dsi-2025/',
	'/about-geely/news/geely-pokazala-pervyi-gonochnyi-avtomobil-s-metanolovoi-silovoi-ustanovkoi-na-shankhaiskom-avtosalone-2025/',
	'/about-geely/news/geely-predstavila-21-novinku-na-shankhayskom-avtosalone/',
	'/about-geely/news/geely-predstavliaet-novyi-gorodskoi-krossover-geely-cityray-v-rossii/',
	'/about-geely/news/geely-predstavliaet-obnovlennyi-7-mestnyi-krossover-geely-okavango/',
	'/about-geely/news/geely-predstavliaet-svoi-pervyi-v-rossii-elektricheskii-krossover-geely-ex5/',
	'/about-geely/news/geely-predstavlyaet-v-rossii-spetsialnuyu-seriyu-krossovera-coolray-nero/',
	'/about-geely/news/geely-preface-in-russia/',
	'/about-geely/news/geely-preface-price/',
	'/about-geely/news/geely-prisoediniaetsia-k-ix-zimnim-aziatskim-igram-prazdniku-sporta-i-tekhnologii/',
	'/about-geely/news/geely-pristupaet-k-vypusku-kosmicheskikh-sputnikov-zarozhdaya-novuyu-eru-v-avtoindustrii/',
	'/about-geely/news/geely-rabotaet-nad-peredovymi-tekhnologiyami-dlya-avtobiznesa-i-ne-tolko/',
	'/about-geely/news/geely-ranks-third-of-published-patents/',
	'/about-geely/news/geely-raskryvaet-komplektatsii-novogo-elektricheskogo-krossovera-geely-ex5-dlia-rossiiskogo-rynka/',
	'/about-geely/news/geely-raskryvaet-nazvanie-novoi-modeli-dlia-rossiiskogo-rynka/',
	'/about-geely/news/geely-rasshiriaet-sotrudnichestvo-s-servisom-karsheringa-sitidraiv/',
	'/about-geely/news/geely-stal-samym-uznavaemym-kitaiskim-avtomobil-nym-brendom-v-rossii/',
	'/about-geely/news/geely-stala-pervym-avtoproizvoditelem-poluchivshim-noveishii-sertifikat-bezopasnosti-batarei-dlia-elektromobilei/',
	'/about-geely/news/geely-stala-postavshchikom-spetsialnykh-avtomobiley-dlya-aziatskikh-igr-v-khanchzhou/',
	'/about-geely/news/geely-tugella-luchshiy-kitayskiy-avtomobil-v-rossii-2022-2023/',
	'/about-geely/news/geely-xingyuan-i-geely-monjaro-voshli-v-top-5-samykh-populiarnykh-avtomobilei-v-kitae-po-itogam-pervogo-kvartala-2025-goda/',
	'/about-geely/news/gruppa-geely-auto-otchitalas-o-rekordnykh-dokhodakh-za-2024-god/',
	'/about-geely/news/ji-yue-novyy-vzglyad-na-budushchee-elektricheskoy-mobilnosti/',
	'/about-geely/news/kholding-geely-predstavlyaet-esg-strategiyu-gruppy-v-otchete-ob-ustoychivom-razvitii-za-2022-god/',
	'/about-geely/news/kompaniia-geely-poluchila-prestizhnuiu-nagradu-iatf-za-vydaiushchiisia-vklad-v-razvitie-mirovykh-standartov-kachestvakompaniia-geely-poluchila-prestizhnuiu-nagradu-iatf-za-vydaiushchiisia-vklad-v-razvitie-mirovykh-standartov-kachestva/',
	'/about-geely/news/kompaniia-geely-predstavila-global-nuiu-strategiiu-five-by-five-i-novyi-shestimestnyi-flagmanskii-krossover-s-podderzhkoi-iskusstvennogo-intellekta/',
	'/about-geely/news/kompaniia-geely-predstavila-pervuiu-sistemu-polnotsennyi-iskusstvennyi-intellekt-dlia-umnykh-transportnykh-sredstv-novogo-pokoleniia/',
	'/about-geely/news/kompaniya-geely-v-fevrale-uvelichila-prodazhi-avtomobiley-v-rossii-na-117/',
	'/about-geely/news/kompaniya-geely-v-mae-realizovala-v-rossii-bolee-2-000-avtomobiley/',
	'/about-geely/news/krossover-geely-galaxy-l7-zanial-pervoe-mesto-v-reitinge-kachestva-j-d-power-china-v-kategorii-kompaktnykh-suv-s-gibridnoi-silovoi-ustanovkoi/',
	'/about-geely/news/krossover-geely-monjaro-pobedil-v-narodnom-golosovanii-novinka-goda-v-rossii/',
	'/about-geely/news/krossover-geely-monjaro-poluchil-premiyu-autostat-awards-2023-v-nominatsii-novinka-goda/',
	'/about-geely/news/krossovery-geely-priznany-luchshimi-po-sokhraneniyu-ostatochnoy-stoimosti/',
	'/about-geely/news/krossovery-geely-vnov-stali-liderami-po-sokhraneniiu-ostatochnoi-stoimosti/',
	'/about-geely/news/kupe-krossover-geely-tugella-stal-samoy-prodavaemoy-modelyu-geely-v-rossii/',
	'/about-geely/news/mirovye-prodazhi-gruppy-geely-auto-prevysili-2-17-mln-avtomobilei-v-2024-godu/',
	'/about-geely/news/mirovye-prodazhi-kholdinga-geely-dostigli-2-79-mln-avtomobiley/',
	'/about-geely/news/ob-ediniaia-traditsii-i-innovatsii-geely-auto-predstavila-vysokotekhnologichnyi-vnedorozhnik-galaxy-cruiser-na-shankhaiskom-avtosalone-2025/',
	'/about-geely/news/prodazhi-populiarnogo-krossovera-geely-monjaro-v-rossii-prevysili-75-000/',
	'/about-geely/news/rossiyskie-potrebiteli-bolshe-vsego-tsenyat-v-avtomobilyakh-bezopasnost-i-komfort/',
	'/about-geely/news/transmissiia-dzhili/',
	'/about-geely/news/treid-in-geely-monjaro/',
	'/about-geely/news/v-rossii-nachinaiutsia-prodazhi-biznes-sedana-geely-preface/',
	'/about-geely/news/v-rossii-nachinaiutsia-prodazhi-gorodskogo-krossovera-geely-cityray/',
	'/about-geely/news/vybor-masla-dlia-avtomobilei-geely/',
	'/about-geely/news/vyruchka-gruppy-geely-auto-za-pervoe-polugodie-2025-goda-prevysila-150-mlrd-iuanei/',
	'/about-geely/news/vysokie-standarty-geely-kompaniia-predstavila-laboratoriiu-tekhnologii-bezopasnosti-avtomobilei-mezhdunarodnym-smi/',
	'/about-geely/news/vysokii-uroven-bezopasnosti-geely-ex5-podtverzhden-po-rezul-tatam-nezavisimogo-krash-testa-v-avstrii/',
  ];

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			configFile: './tailwind.geely.js'
		}),
		sitemap({
			filter: (page) => !page.endsWith('telegram-bot/') && !page.endsWith('redirect/')
		}),
		robots({
			policy: [
				{
					userAgent: "Yandex",
					allow: ["/"],
					disallow: ["/?*"],
					cleanParam: [
						"_ym_debug&_ym_lang&_ym_status-check&yadclid&yadordid&yandex_ad_client_id&yandex-source&yclid&yhid&ymclid&yhic&ychyd&ycilyd&ycylid&ypppel&yqppel", 
						"_ga&_gac&ga&gclid&gcmes&gcmlg&utm_sourcegoogle", 
						"utm_&utm_bn_id&utm_bn_system_id&utm_branch&utm_c&utm_campai&utm_campaign&utm_content&utm_from&utm_hclid&utm_me&utm_mediu&utm_medium&utm_orderpage&utm_partner_id&utm_placement&utm_position&utm_redirect&utm_referer&utm_referrer&utm_source&utm_startpage&utm_term&utm_type&_openstat&_source_stat_&gtm_debug", 
						"adid&admitad_uid&adrclid&adv&aid&baobab_event_id&bxajaxid&calltouch_tm&clid&dclid&erid&etext&fbclid&from&frommarket&height&int_campaign&lang&length&mindbox&mindbox_nocache&mindbox-click-id&mindbox-message-key&mobileApp&msclkid&msisdn&mt_click_id&noredirect&openstat&order&ORDER_BY", 
						"pay&payment&q&s&rb_clickid&ref&referrer&roistat_visit&sa&set_filter&source&tag&tags&target&text&token&twclid&type&types&userDataToken&USERID&uuid&ved&vendor&wbraid&width&action&register&cid&k50id&search&cm_id&ivid&hl&tpclid", 
						"region&region_name&utm_ya_campaign&utm_candidate&block&model&color&drive&complects&editionuid"
					],
				},
				{
					userAgent: "Googlebot",
					allow: ["/"],
					disallow: ["/?*"],
				},
				{
					userAgent: ["*"],
					allow: ["/"],
					disallow: ["/?*"],
				},
			],
		}),
		alpinejs(),
		mdx(),
		icon(),
		react(),
	],
	vite: {
		plugins: [yaml()],
		css: {
			preprocessorOptions: {
			  	scss: {
					silenceDeprecations: ['legacy-js-api'],
				},
			},
		},
	},
	redirects: {
		// Раздел About
		'/about-geely/': '/',
		'/about-geely/brand-geely/': '/models/',
		'/about-geely/dealer/': '/contacts/',
		'/about-geely/news/': '/news/',
	
		// Канонизация конкретных дублей
		'/models/geely-okavango/': '/models/okavango/',
	
		// Пример: если нет страницы "Команда"
		'/team/': '/contacts/',
		
		// Прочие точечные — добавляйте тут по мере необходимости
		// '/cars/...': '/used_cars/',
	},
	
	// Хак: разворачиваем массив legacyNews в объект редиректов → '/news/'
	// (Astro позволяет вычислять объект из JS)
	// @ts-ignore
	...(legacyNews.length && {
		redirects: Object.fromEntries([
			...Object.entries({
				'/about-geely/': '/',
				'/about-geely/brand-geely/': '/models/',
				'/about-geely/dealer/': '/contacts/',
				'/about-geely/news/': '/news/',
				'/models/geely-okavango/': '/models/okavango/',
				'/team/': '/contacts/',
			}),
			...legacyNews.map((p) => [p, '/news/']),
		]),
	}),
	site: 'https://geely-partner-samara.ru',
	base: "/"
});
