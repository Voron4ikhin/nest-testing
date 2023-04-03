import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { PaymentsService } from '../../../payments/services/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const requestMock = {
      query: {},
  } as unknown as Request;

  const statusResponseMock = {
    send: jest.fn((x)=> x),
  }

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [{
        provide: 'PAYMENTS_SERVICE',
        useValue: {
          createPayment: jest.fn((x)=> x),
        }
      }]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('payment service shoud be defined', ()=>{
    expect(paymentsService).toBeDefined();
  })

  describe('getPayments', ()=>{
    it('should return a status of 400', async () =>{
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query parametr',
      })
    });

    it('should return a status of 200 when query params are present',async ()=>{
      requestMock.query = {
        count: '10',
        page: '1',
      };
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    })
  });


  describe('createPayment', () => {
    // it('should return a successful response', async () => {
    //   const response = await controller.createPayment({
    //     email: 'angvasburgen@gmail.com',
    //     price: 100,
    //   });

    //   expect(response).toStrictEqual({status: 'success'});
    // })

    it('should trow an error', async () => {
      jest
      .spyOn(paymentsService, 'createPayment')
      .mockImplementationOnce(()=>{
        throw new BadRequestException();
      })
      try{
        const response = await controller.createPayment({
          email: 'aniston@gmail.com',
          price: 100,
        })
      } catch(err){
        console.log(err)
      }
    });
  });

});
