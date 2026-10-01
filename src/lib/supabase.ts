import { Platform } from 'react-native';
if (Platform.OS !== 'web') {
  require('react-native-url-polyfill/auto');
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrhayqebmahnvcuidbrr.supabase.co';
const supabaseAnonKey = 'sb_publishable_ewEYY7pnj1Hez4xVBKD_OA_vF7Tqa0g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
