import { Injectable } from '@nestjs/common';
import {EachMessagePayload, Kafka, logLevel} from "kafkajs";
import {AppGateway} from "./app.gateway";

@Injectable()
export class AppService {
  // kafka 객체 생성
  private kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: [process.env.KAFKA_CLIENT_BOOTSTRAP_SERVER],
    logLevel: logLevel.INFO,
  })

  private consumer = this.kafka.consumer({
    groupId: process.env.GROUP_ID
  })

  constructor(
    private readonly appGateway: AppGateway
  ) {
    this.consumer.connect().then(r => console.log('connected'));
    this.consumer.subscribe({ topics: ['tradeData']}).then(r => console.log('subscribe'))
    this.consumer.run({
      eachMessage: async(payload: EachMessagePayload) => {
        await this.consumerCallback(payload)
      }
    }).then(r => console.log('run'));
  }

  async consumerCallback(payload: EachMessagePayload) {
    console.log('✨✨✨✨✨✨✨')
    console.log('kafka message 도착')
    console.log(`topic : ${payload.topic}, Message: ${payload.message.value.toString()}`)
    console.log('✨✨✨✨✨✨✨')
    // 도착했으니 저장하고 FE로 전달하는 과정 필요함.

    /**
     * 추후 DB에 저장하는 과정을 구현할 위치
     */

    // FE로 전달하는 과정
    const messageData = JSON.parse(payload.message.value.toString());
    this.appGateway.sendKafka(messageData);
  }
}
