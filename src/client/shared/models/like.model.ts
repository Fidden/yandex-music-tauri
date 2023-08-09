import {UserModel} from '~/client/shared/models/user.model';
import {BaseModel} from '~/client/shared/types/abstract/base.model';
import {LikeActionEnum, ObjectTypeEnum} from '~/client/shared/types/api';

export class LikeModel extends BaseModel {
	private static userId?: number = undefined;

	public static async setup() {
		this.userId = UserModel.status?.account?.uid;
	}

	public static action<T extends ObjectTypeEnum>(
		objectType: T,
		action: LikeActionEnum,
		objectIds: string | number | string[] | number[]
	) {
		return super.request.post<T extends ObjectTypeEnum.TRACK ? {revision: number} : string>(`/users/${this.userId}/likes/${objectType}s/${action}`, {
			query: {
				[`${objectType}Ids`]: objectIds
			}
		});
	}
}
