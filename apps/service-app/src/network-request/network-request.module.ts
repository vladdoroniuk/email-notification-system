import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NetworkService } from './network-request.service';

@Module({
  imports: [HttpModule],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
