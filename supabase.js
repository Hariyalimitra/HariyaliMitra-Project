const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://zhpidsbrvqgpdhiieiwo.supabase.co",
    "sb_publishable_UtrrZAp6B2lF3DScbL8mzg_3vWRcWgs"
);

module.exports = supabase;