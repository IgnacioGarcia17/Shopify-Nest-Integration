import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

interface IshopifyCompanyConfig {
    shop: string;
    apiSecret: string;
    apiKey: string;
}
type TshopifyBearerToken = `Bearer ${string}`;

@Injectable()
export class ShopifyService {
    private readonly apiKey: string;
    private readonly apiSecret: string;
    private readonly scopes = 'read_products';
    private readonly redirectUri: string;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('SHOPIFY_API_KEY') ?? (() => { throw new Error('SHOPIFY_API_KEY is missing'); })();
        this.apiSecret = this.configService.get<string>('SHOPIFY_API_SECRET') ?? (() => { throw new Error('SHOPIFY_API_SECRET is missing'); })();
        this.redirectUri = this.configService.get<string>('SHOPIFY_REDIRECT_URI') ?? (() => { throw new Error('SHOPIFY_REDIRECT_URI is missing'); })();
    }

    getAuthUrl(shop: string): string {
        const state = crypto.randomBytes(16).toString('hex');
        const url = `https://${shop}/admin/oauth/authorize?client_id=${this.apiKey}&scope=${this.scopes}&redirect_uri=${this.redirectUri}&state=${state}`;
        return url;
    }

    async handleCallback(query: any): Promise<string> {
        const { shop, hmac, code } = query;

        const map = { ...query };
        delete map['signature'];
        delete map['hmac'];

        const message = Object.keys(map)
            .sort()
            .map((key) => `${key}=${map[key]}`)
            .join('&');

        const generatedHash = crypto
            .createHmac('sha256', this.apiSecret)
            .update(message)
            .digest('hex');

        if (generatedHash !== hmac) {
            throw new Error('HMAC validation failed');
        }

        const tokenResponse = await axios.post(
            `https://${shop}/admin/oauth/access_token`,
            {
                client_id: this.apiKey,
                client_secret: this.apiSecret,
                code,
            },
        );

        return tokenResponse.data.access_token;
    }



    /**
     * GET CLIENT
     */
    private async _getShopifyClientBearerToken(shopifyCompanyConfig: IshopifyCompanyConfig): Promise<TshopifyBearerToken> {

        return `Bearer `;
    }


    /**
     * GET PRODUCTS
     */
    async getProducts(shopifyCompanyConfig): Promise<any> {

        let shopClientBearerToken = this._getShopifyClientBearerToken(shopifyCompanyConfig);

        return {

        }
    }

    /**
     * GET ORDERS
     */
    async getOrders(shopifyCompanyConfig): Promise<any> {

        let shopClientBearerToken = this._getShopifyClientBearerToken(shopifyCompanyConfig);

        return {

        }
    }



}

