import {Injectable, OnModuleInit} from '@nestjs/common';
import {Kafka, logLevel} from "kafkajs";

@Injectable()
export class AppService {
  // kafka 객체 생성
  private kafka = new Kafka({
    clientId: process.env.CLIENT_ID, // 애플리케이션 식별자
    brokers: [process.env.KAFKA_CLIENT_BOOTSTRAP_SERVER], // 카프카 서버 주소 목록
    logLevel: logLevel.INFO,
  })
  // producer 인스턴스 생성, 토픽이 없으면 자동 생성 옵션 추가했음.
  private producer = this.kafka.producer({allowAutoTopicCreation: true});

  // service 인스턴스가 생성될 때 kafka producer connect!
  constructor() {
    this.producer.connect();
  }

  // 메세지를 받으면 실행될 핵심 로직
  async sendMessage(
    topic : string,
    coinName : string,
    numOfCoin : number,
    price : number,
  ) {
    try {
      console.log('service-sendMessage', topic, coinName, price, numOfCoin);
      // topic과 message를 전송
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify({
            coinName,
            numOfCoin,
            price,
          })
        }],
      })
    } catch (error) {
      console.log(`error sending message to Kafka : ${error.message}`)
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
