import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ShopifyService } from './shopify.service';
import { ShopifyProductsService } from './services/shopify-products.service';

/**
 * Controller for handling Shopify-related routes.
 * @class ShopifyController
 */
@Controller('shopify')
export class ShopifyController {
    constructor(
        private readonly shopifyService: ShopifyService,
        private readonly shopifyProductsService: ShopifyProductsService
    ) { }

    /**
     * Redirects to the Shopify authentication URL.
     * @param shop The shop name.
     * @param res The response object.
     */
    @Get('auth')
    async redirectToShopify(
        @Query('shop') shop: string,
        @Res() res: Response,
    ) {
        const authUrl = this.shopifyService.getAuthUrl(shop);
        return res.redirect(authUrl);
    }

    /**
     * Handles the callback from Shopify after authentication.
     * @param query The query parameters from the callback.
     * @param res The response object.
     */
    @Get('callback')
    async handleCallback(@Query() query, @Res() res: Response) {
        const accessToken = await this.shopifyService.handleCallback(query);
        return res.json({ accessToken });
    }

    /**
     * Fetches products from Shopify.
     * @returns The list of products.
     */
    @Get('products')
    async getProducts() {
        const products = await this.shopifyProductsService.getProducts({
            shop: "string",
            apiSecret: "string",
            apiKey: "string",
        });
        return products;
    }

    /**
     * Fetches orders from Shopify.
     * @returns The list of orders.
     */
    @Get('orders')
    async getOrders() {
        const orders = await this.shopifyProductsService.getOrders({
            shop: "string",
            apiSecret: "string",
            apiKey: "string",
        });
        return orders;
    }
}
