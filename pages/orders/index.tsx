import { WithDefaultLayout } from "@/components/DefautLayout";
import { Title } from "@/components/Title";
import { Page } from "@/types/Page";

const OrderMainMenuPage: Page = () => {
    return (
        <div>
            <Title>Home</Title>
            Hello World!
        </div>
    );
}

OrderMainMenuPage.layout = WithDefaultLayout;
export default OrderMainMenuPage;
