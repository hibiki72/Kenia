import { parseISO, format } from 'date-fns';
import type { FC } from 'react';

type Props = {
	dateString: string;
};
const Date: FC<Props> = ({ dateString }) => {
	const date = parseISO(dateString);
	return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
export default Date;