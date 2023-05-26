import { Container, decorate, injectable } from 'inversify';
import { Controller } from 'tsoa';
import { IUrlsProvider, IUrlsRepository } from './functions/urls/interfaces';
import { UrlsProvider } from './functions/urls/providers/urls_provider';
import { UrlsRepository } from './functions/urls/repositories/urls_repository';
import { TYPES } from './types';

const iocContainer = new Container({ autoBindInjectable: true });

decorate(injectable(), Controller);

// iocContainer.bind<IUrlsController>(TYPES.UrlsController).to(UrlsController);
iocContainer.bind<IUrlsRepository>(TYPES.UrlsRepository).to(UrlsRepository);
iocContainer.bind<IUrlsProvider>(TYPES.UrlsProvider).to(UrlsProvider);

export { iocContainer };
