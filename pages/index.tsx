import Link from 'next/link';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const IndexPage: Page = () => {
    return (
        <div>
            <Title>Home</Title>
            Waktu tidak mengcukupi jadi klik link bawah untuk ke main menu.
            <Link href="/orders">Click here to go to Main Menu</Link>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
