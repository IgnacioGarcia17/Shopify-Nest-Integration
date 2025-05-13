import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ShopifyService } from './shopify.service';

@Controller('shopify')
export class ShopifyController {
    constructor(private readonly shopifyService: ShopifyService) { }

    @Get('auth')
    async redirectToShopify(
        @Query('shop') shop: string,
        @Res() res: Response,
    ) {
        const authUrl = this.shopifyService.getAuthUrl(shop);
        return res.redirect(authUrl);
    }

    @Get('callback')
    async handleCallback(@Query() query, @Res() res: Response) {
        const accessToken = await this.shopifyService.handleCallback(query);
        return res.json({ accessToken });
    }
}
