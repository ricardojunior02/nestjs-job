import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Ricardo Junior / Estudo nestjs',
      subject: 'Estudando um pouco de tarefas em background com nestjs',
      text: `Ola ${data.name} bem vindo ao curso de nestjs com filas`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On Complete ${job.name}`);
  }
}

export { SendMailConsumer };
