import {Body, Controller, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 메세지를 보낼 때 해당 경로로 POST!
  @Post('send-trading-data')
  async sendTradingData(
    @Body('topic') topic:string,
    @Body('coinName') coinName:string,
    @Body('price') price:number,
    @Body('numOfCoin') numOfCoin:number,
  ) {
    console.log(topic, coinName, price, numOfCoin);
    if (topic === undefined) {
      return 'topic is undefined'
    } else {
      // 받은 값을 가지고 service에서 정의한 sendMessage 실행
      await this.appService.sendMessage(topic, coinName, price, numOfCoin);
      return `topic ${topic} added`
    }
  }
}
