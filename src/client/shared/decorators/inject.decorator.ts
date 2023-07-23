import InjectionToken from 'tsyringe/dist/typings/providers/injection-token';
import {defineInjectionTokenMetadata} from '~/client/shared/helpers/define-injection-token-metadata';

export function injectDep(
	token: InjectionToken<any>
): (
	target: any,
	propertyKey: string | symbol | undefined,
	parameterIndex: number
) => any {
	return defineInjectionTokenMetadata(token);
}
