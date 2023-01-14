import { ApiProperty } from '@nestjs/swagger';
import { IServiceVoidData } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';

export class UnavailableServiceResponseDto implements IServiceVoidData {

  @ApiProperty()
    message!: string;

  @ApiProperty()
    code!: string;

  @ApiProperty()
    serviceName!: string;

  @ApiProperty({
    default: false,
  })
    status!: boolean;

}

export class UnavailableServiceResponseDoc {

  @ApiProperty({
    type: UnavailableServiceResponseDto,
  })
    data: UnavailableServiceResponseDto;

  @ApiProperty({
    default: false,
  })
    isOk: boolean;

}
