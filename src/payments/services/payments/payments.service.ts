import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {

    private users = [
        {
            email: 'stupdio@mail.ru'
        },
        {
            email: 'fuckido@mail.ru'
        },
        {
            email: 'creatigo@mail.ru'
        }
    ]

    async createPayment(createPaymentDto: CreatePaymentDto){
        const { email } = createPaymentDto;
        const user = this.users.find((user) => user.email === email);
        if(user)
            return {
                id: 1,
                status: 'success',
            };
        else{
            throw new BadRequestException();
        }
    }
}
