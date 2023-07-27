import {AlbumTypeEnum} from '~/client/shared/types/api';


export const albumType = {
	get: (type?: AlbumTypeEnum) => {
		switch (type) {
			case AlbumTypeEnum.PODCAST: {
				return 'podcast' as const;
			}
			case AlbumTypeEnum.SINGLE: {
				return 'single' as const;
			}
			default: {
				return 'album' as const;
			}
		}
	},
	toHuman: (type?: AlbumTypeEnum) => {
		switch (type) {
			case AlbumTypeEnum.PODCAST: {
				return 'Подкасат';
			}
			case AlbumTypeEnum.SINGLE: {
				return 'Сингл';
			}
			default: {
				return 'Альбом';
			}
		}
	}
};
