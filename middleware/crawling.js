"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require('cheerio');
const puppeteer_1 = __importDefault(require("puppeteer"));
const Crawling = {
    getData: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const originURL = 'http://search.danawa.com/dsearch.php?k1=' + data;
            const URL = encodeURI(originURL);
            const creawlingDatas = [];
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(URL);
            const content = yield page.content();
            const $ = cheerio.load(content);
            const lists = $('#powerShoppingArea > div > div.search_goods_list > ul > li');
            yield lists.each((index, list) => {
                const title = $(list).find('p.goods_title').text().replace('\n', '').replace(/^\s+/, '');
                const price = $(list).find('p.goods_price > em').text();
                const imageURL = $(list).find('a > img').attr('src');
                const seller = $(list).find('p.goods_npay > span.txt_npay').text();
                const linkURL = $(list).find('a').attr('href');
                creawlingDatas[index] = {
                    imageURL: imageURL,
                    title: title,
                    price: price,
                    seller: seller,
                    linkURL: linkURL,
                };
            });
            yield browser.close();
            return creawlingDatas;
        }
        catch (err) {
            throw new Error('error');
        }
    }),
};
exports.default = Crawling;
//# sourceMappingURL=crawling.js.map