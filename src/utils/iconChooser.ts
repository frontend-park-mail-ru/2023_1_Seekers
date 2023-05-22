import {icons} from '@config/icons';


class IconChooser {
    choose = (fileName: string) => {
        const extention = fileName.split('.').pop();

        if (extention) {
            const foundIcon = icons.find((icon) => icon.ext === extention);
            if (foundIcon) {
                return foundIcon.svg;
            } else {
                return icons[0].svg;
            }
        }
        return icons[0].svg;
    };
}

export const iconChooser = new IconChooser();
