'use client'
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

const withRoleRedirect = (WrappedComponent, allowedRoles) => {
   const WithRoleRedirect = (props) => {
   //eslint-disable-next-line
      const userRole = localStorage.getItem('user_role')
      const router = useRouter()

      useLayoutEffect(() => {
         // Check if user role is in the allowedRoles array
         if (!userRole && !allowedRoles.includes(userRole)) {
            router.push('/') // Change this to your default login page
         }
      }, [userRole])


      if (userRole && allowedRoles.includes(userRole)) {
         return <WrappedComponent {...props} />
      } else {
         return 'Checking user authorization...'
      }
   }

   return WithRoleRedirect
}

export default withRoleRedirect
