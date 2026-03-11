'use client';

import { ContactSupport } from '@/components/Block/Auth/Appsumo/ContactSupport';
import { Wrapper } from '@/components/Block/Auth/Wrapper';
import { RiCard } from '@/components/shared/RiCard/RiCard';
import { RiForm } from '@/components/shared/RiForm/RiForm';
import { useToast } from '@/hooks/useToast';
import { loginUser } from '@/utils/apis/auth';
import { appsumoOnboard } from '@/utils/apis/others';
import { PATH } from '@/utils/constants/others/paths';
import { COOKIES } from '@/utils/constants/others/cookies';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

