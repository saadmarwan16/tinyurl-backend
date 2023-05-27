import { Container, decorate, injectable } from 'inversify';
import { Controller } from 'tsoa';
import {
	IUrlsController,
	IUrlsProvider,
	IUrlsRepository,
} from './functions/urls/interfaces';
import { UrlsProvider } from './functions/urls/providers/urls_provider';
import { UrlsRepository } from './functions/urls/repositories/urls_repository';
import { TYPES } from './types';
import { UrlsController } from './functions/urls/controllers/urls_controller';

const iocContainer = new Container({ autoBindInjectable: true });

decorate(injectable(), Controller);

iocContainer.bind<IUrlsController>(TYPES.UrlsController).to(UrlsController);
iocContainer.bind<IUrlsRepository>(TYPES.UrlsRepository).to(UrlsRepository);
iocContainer.bind<IUrlsProvider>(TYPES.UrlsProvider).to(UrlsProvider);

export { iocContainer };
