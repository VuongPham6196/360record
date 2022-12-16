import Company from 'components/Company/Company';
import DefaultLayout from 'layouts/DefaultLayout';

const Companies: React.FC = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Company />
    </DefaultLayout>
  );
};

export default Companies;
