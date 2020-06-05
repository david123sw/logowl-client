import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

import Confirmation from 'components/UI/confirmation/Confirmation';
import Button from 'components/UI/button/Button';
import Card, { Header } from 'components/UI/card/Card';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

import styling from './Settings.module.scss';

const Settings = ({ history, serviceName, serviceId }) => {
    const [, , setError] = useStore();
    
    const [{ confirmVisibility, isLoading }, setState] = useState({
        confirmVisibility: false,
        isLoading: false
    });
    
    
    /**
     * Deletes a service with the given ID.
     * @returns {Promise<void>}
     */
    const deleteService = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoading: true }));
            
            await fetchClient('deleteService', null, '/service/' + serviceId);
            
            setTimeout(() => history.push('/services'), 1020);
            
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };
    
    
    /**
     * Toggles the visibility of the confirm modal.
     */
    const toggleConfirmVisibility = () => {
        setState(prevState => ({ ...prevState, confirmVisibility: !prevState.confirmVisibility }));
    };
    
    return (
        <>
            <Card>
                <Header icon={<FiSettings />}>Service Settings</Header>
                
                <div className={styling.row}>
                    <div className={styling.description}>
                        <h6>Delete Service</h6>
                        <p>Delete this service and all its data</p>
                    </div>
                    
                    <Button onClick={toggleConfirmVisibility} size='smaller'>Delete</Button>
                </div>
            </Card>
            
            <Confirmation
                open={confirmVisibility}
                title={'Delete ' + serviceName}
                message={`Please confirm that you want to delete the service ${serviceName} and all its data. Deleting a service is permanent and can not be undone.`}
                label='Delete'
                cancelHandler={toggleConfirmVisibility}
                confirmHandler={deleteService}
                isLoading={isLoading}
            />
        </>
    );
};

export default Settings;