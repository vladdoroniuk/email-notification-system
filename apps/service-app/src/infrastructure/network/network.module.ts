import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NetworkService } from './network.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
