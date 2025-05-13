import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ShopifyService } from '../shopify.service';

@Injectable()
export class ShopifyProductsService {

    constructor(private readonly shopifyService: ShopifyService,) {

    }

    /**
     * GET PRODUCTS
     */
    async getProducts(shopifyCompanyConfig): Promise<any> {

        let shopClientBearerToken = this.shopifyService._getShopifyClientBearerToken(shopifyCompanyConfig);

        return {

        }
    }

    /**
     * GET ORDERS
     */
    async getOrders(shopifyCompanyConfig): Promise<any> {

        let shopClientBearerToken = this.shopifyService._getShopifyClientBearerToken(shopifyCompanyConfig);

        return {

        }
    }



}

