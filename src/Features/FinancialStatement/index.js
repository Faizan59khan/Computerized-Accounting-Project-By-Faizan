/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './financialstatement.css';
import {useCollection} from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';





function FinancialStatementMainComponent() {
   
 

    const {documents,error}=useCollection('generalEntry');
    const {dispatch,rev,exp,netInc}=useAuthContext();


    const allTypesData=()=>{
        let revTotal=0;
        let expTotal=0;
        let netTotal=0;
        let ownerWithDraw=0
        let assetsTotal=0;
        let liabTotal=0;
        let ownerEquity=0;
        let endingOwnerEquity=0;
      documents && documents.map((arr,index)=>{
         const {typeA,debit}=arr[0];            //type and amount
         const {typeB,credit}=arr[1];
        // console.log(typeB,credit);

         console.log(typeB)

         if(typeB=="Revenue"){
            revTotal+=Number(credit);
         }
         if(typeB=="Owner Equity"){
            ownerEquity+=Number(credit)
          }
         if(typeA=="Expense"){
            expTotal+=Number(debit);
         }
         if(typeA=="Owner withdraw"){
            ownerWithDraw+=Number(debit);
         }
         if(typeA=="Asset"){
           assetsTotal+=Number(debit)
         }
         if(typeB=="Asset"){
            assetsTotal-=Number(credit)
          }
         if(typeA=="Liability"){
            console.log("yes");
            liabTotal+=Number(debit)
          }
        if(typeB=="Liability"){
             console.log("yes")
             liabTotal-=Number(credit)
           } 
      })
      netTotal=revTotal-expTotal;
      endingOwnerEquity=(netTotal-ownerWithDraw);

      console.log(assetsTotal,liabTotal);
       return{
        revTotal,
        expTotal,
        netTotal,
        ownerWithDraw,
        assetsTotal,
        liabTotal,
        ownerEquity,
        endingOwnerEquity
       }

    }


    const generateIncomeStatement=()=>{
        const {revTotal,expTotal,netTotal}=allTypesData();
         
         return(
            <div className='income-statement'>
                <h1>Income statement</h1>
                  <div className='rev-exp'>
                    <div>Revenue: {revTotal}</div>
                    <div>Expense: {expTotal}</div>
                  </div>

                  <div className='net-inc'>Net Income: {netTotal}</div>
            </div>
         )
    }

    const generateOwnetEquityStatement=()=>{
       const {netTotal,ownerWithDraw,ownerEquity}=allTypesData();
       const balance=(netTotal-ownerWithDraw);
  

       return(
        <div className='owner-equity-statement'>
            <h1>Owner Equity statement</h1>
           <div className='OE-entries'>
            <h4>Beginnig Balance: {}</h4>
           <h4>Less Owner withdraw: {ownerWithDraw}</h4>
           <h4>Add Net Income: {netTotal}</h4>
           <h4>Ending Balance of OC: {balance}</h4>
           </div>
        </div>
       )
    }
  
    const balanceSheetStatement=()=>{
         const {assetsTotal,liabTotal,endingOwnerEquity,ownerWithDraw,ownerEquity}=allTypesData();

         let flag=0;
         if(assetsTotal==(liabTotal+endingOwnerEquity+ownerEquity)){     //if balance is equal
               flag=1;
            }
         
         
         return(
            <>
            <h1>Balance Sheet statement</h1>
            <div className='balance-sheet'>
                <div className='asset-col'>
                    <h2>Assets</h2>
                    <h3>Total: {assetsTotal}</h3>
                </div>
                <div className='liab-oe-col'>
                    <h2>Liability and Owner Equity</h2>
                    <h3>Liability: {liabTotal}</h3>
                    <h3>Owner Equity: {ownerEquity}</h3>
                    <h3>Ending Balance of OC: {endingOwnerEquity}</h3>
                    <h3>Total: {liabTotal+endingOwnerEquity+ownerEquity}</h3>
                </div>
            </div>
             {
               flag==1 && <h1>Balanced</h1>
             }
             {
               flag==0 && <h1>UnBalanced</h1>
             }
            </>
         )
    }
  

 

 

    return (
        <div className='financial-statements'>
              
          
             {generateIncomeStatement()}
             {generateOwnetEquityStatement()}
             {balanceSheetStatement()}



        </div>
    )
}

export default FinancialStatementMainComponent;
