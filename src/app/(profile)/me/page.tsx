import { Separator } from '@/components/ui/separator';
import { RequireAuth } from '@/midleware/auth';
import React from 'react'
import { ProfileForm } from './profile-form';

const MePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông tin cá nhân</h3>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
export default MePage
