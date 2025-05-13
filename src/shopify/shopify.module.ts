import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';
import { ShopifyProductsService } from './services/shopify-products.service';

@Module({
  controllers: [ShopifyController],
  providers: [ShopifyService, ShopifyProductsService]
})
export class ShopifyModule {}
