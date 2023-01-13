import { Command, CommandProps } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import {
  CollectStatisticCommandDto,
} from '@modules/statistic/application/use-cases/collect-statistic/dtos/collect-statistic-command.dto';

export class CollectStatisticCommand extends Command {

  constructor(props: CommandProps<CollectStatisticCommandDto>) {
    super(props);
    this.payload = props;
  }

  public payload: CollectStatisticCommandDto;

}
