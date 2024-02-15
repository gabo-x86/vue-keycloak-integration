import { createRouter, createWebHistory } from 'vue-router'
import { keycloak } from './keycloak';

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'homepage' }
    },
    {
        path: '/home',
        name: 'homepage',
        component: () => import('../components/Homepage.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/Dashboard.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        if (keycloak.authenticated) {
            next();
        } else {
            keycloak.login();
        }
    } else {
        next();
    }
});

export default router;