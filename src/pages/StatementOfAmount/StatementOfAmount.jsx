import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context';
import { useLocation } from 'react-router-dom';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import CustomEditModal from '../../CommonComponent/EditForms/EditModal';
import CustomTabel from '../../CommonComponent/Tabels/Tabel';
import statement_of_amount_arr from './StatementOfAmountArr';

const StatementOfAmountComp = () => {
    const { getCustomerStatmentOfAccount,
        statementOfAmount } = useContext(DataContext);

    useEffect(() => {
        getCustomerStatmentOfAccount();
    }, []);

    if (!statementOfAmount){
        return <Loading />
    }

    
console.log(statementOfAmount);

    return (
        <div>
        <CustomTabel
            getFunc={getCustomerStatmentOfAccount} 
            tabelObj={statementOfAmount} 
            topTableHeading={statement_of_amount_arr}
            key={1}
            EditModal={CustomEditModal}
            url_route={"#"}
            title={"Statement Of Account"}
            // query={queryParams}
        />
    </div>
    )

}

export default StatementOfAmountComp







