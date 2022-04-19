import { useState } from 'react';
import './App.css';
import Keterangan from './components/Keterangan';
import {gql, useQuery, useMutation, useSubscription} from '@apollo/client';
import LoadingSvg from './components/LoadingSvg';
import useUpdateKeterangan from './hooks/useUpdateKeterangan';
import useDeleteKeterangan from './hooks/useDeleteKeterangan';
import useInsertKeterangan from './hooks/useInsertKeterangan';
import useSubscriptionKeterangan from './hooks/useSubscribeKeterangan';
import useGetKeteranagan from './hooks/useGetKeterangan'

  function KeteranganList() {
    const { data, loading, error, subscribeKeterangan} = useGetKeteranagan
    // const {data, loading, error} = useQuery(GetKeteranganlist); // Mutation

    const {updateKeterangan, loadingUpdate} = useUpdateKeterangan();
    const {deleteKeterangan, loadingDelete} = useDeleteKeterangan();
    const {insertKeterangan, loadingInsert} = useInsertKeterangan();

    // const {data, loading, error} = useSubscriptionKeterangan(); // Subscription

    // const [userId, setUserId] = useState(0);
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');

    if(loading || loadingUpdate || loadingDelete || loadingInsert) {
      <LoadingSvg/>
    }

    if(error) {
      console.log(error)
      return null;
    }
  
    const onChangeTitle = (e) => {
      if (e.target) {
        setTitle(e.target.value);
      }
    };
  
    const onSubmitList = (e) => {
      e.preventDefault();
      insertKeterangan({variables: {
        object: {
          title: title,
          user_id: 1,
        }
      },})
      setTitle('')
    };
  
    const onClickItem = (idx) => {
        const item = data?.keteranganlist.find((v) => v.id === idx);
        updateKeterangan({
          variables: {
          id: idx,
          Status: !item.Status,
        },
      });
      // refetch();
    };
  
    const onDeleteItem = (idx) => {
      deleteKeterangan({variables: {
        id: idx
      }})
    };

    // const onGetData = () => {
    //   getKeterangan({
    //     variables: {
    //       user_id: userId,
    //     },
    //   })
    //   setList(data?.keteranganlist);
    // };

    // const onChangeUserid = (e) => {
    //   if (e.target) {
    //     setUserId(e.target.value);
    //   }
    // };

    return (
      <>
        <div className='container'>
          {/* <input value={userId} onChange={onChangeUserid}/>
          <button onClick={onGetData}>Get Data</button> */}
          <h1 className='app-title'>Keterangan</h1>
            <ul className='keterangan-list js-keterangan-list'>
              {data?.keteranganlist.map((v) => (
                <Keterangan
                key={v.id}
                id={v.id}
                onClickItem={() => onClickItem(v.id)}
                onDeleteItem={() => onDeleteItem(v.id)}
                title= {v.title}
                checked={v.Status}
                />
              ))}
            </ul>
            <div className='empty-state'>
              <svg>
                <use href='#checklist-icon'></use>
              </svg>
              <h2 className='empty-state__title'>Add your first Keterangan</h2>
              <p className='empty-state__description'>
                What do you want to get done today
              </p>
            </div>
            <form className='js-form' onSubmit={onSubmitList}>
              <input onChange={onChangeTitle} 
                value={title}
                autoFocus
                type='text'
                aria-label='Enter a new keterangan item'
                placeholder='E.g. Build a web app'
                className='js-todo-input'
              />
            </form>
        </div>
      </>
    );
  };

export default KeteranganList;
