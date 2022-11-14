import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = 'https://osdsuglajugvvreoqwpi.supabase.co'
const KEY_API = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZHN1Z2xhanVndnZyZW9xd3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODM5OTUsImV4cCI6MTk4Mzk1OTk5NX0._-oyqm-LturvKCYlum0k_x69QSKjapg1GzbjnBoUP_g'
const supabase = createClient(PROJECT_URL, KEY_API)

export default function videoService() {
    return {
        getAllvideos() {
            return supabase.from('videos').select('*')
        }
    }
}