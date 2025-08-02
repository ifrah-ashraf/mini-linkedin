/* import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import supabase from '@/lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const salt_to_mix = 10;

// this is to parse mutipart/form data as next js body parser doesn't have by default parser for images.
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Form parsing failed' });

        const { name, email, password, dob, bio } = fields;
        const image = files.profile_image;

        if (!name || !email || !password || !dob || !bio) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const { data: existingUser } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .single();

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(
                Array.isArray(password) ? password[0] : password,
                salt_to_mix
            );

            // If image exists, then only upload to Supabase Storage.
            let profile_image_url: string | null = null;
            const fileObj = Array.isArray(image) ? image[0] : image;

            if (fileObj && fileObj.filepath) {
                const file = fs.readFileSync(fileObj.filepath);
                const fileExt = fileObj.originalFilename?.split('.').pop();
                const fileName = `user-${Date.now()}.${fileExt}`;

                const { data: storageData, error: uploadError } = await supabase.storage
                    .from('profile-images')
                    .upload(fileName, file, {
                        contentType: fileObj.mimetype || 'image/jpeg',
                        upsert: true,
                    });

                if (uploadError) {
                    return res.status(500).json({ error: 'Image upload failed', details: uploadError });
                }

                profile_image_url = supabase.storage
                    .from('profile-images')
                    .getPublicUrl(fileName).data.publicUrl;
            }

            // Insert user (with or without image)
            const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert({
                    name,
                    email,
                    password: hashedPassword,
                    dob,
                    bio,
                    profile_image_url,
                    created_at: new Date().toISOString(),
                })
                .select('*')
                .single();

            if (insertError) {
                return res.status(500).json({ error: 'User insert failed', details: insertError });
            }
            // 5. Generate JWT
            const token = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                },
                process.env.JWT_SECRET!,
                { expiresIn: '1d' }
            );

            return res.status(201).json({ token, user: newUser });
        } catch (error) {
            return res.status(500).json({ error: 'Internal error', details: error });
        }
    });
}
 */