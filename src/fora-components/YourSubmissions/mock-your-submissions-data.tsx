import moment from 'moment';
import { ISubmissionProps } from '.';

const mockAvatar = {
  onDark: false,
  name: 'Simona Pop',
  address: '0xbfecfede',
  src: undefined,
  img: 'https://messari.s3.amazonaws.com/images/agora-images/0%3Fe%3D1554940800%26v%3Dbeta%26t%3DJIYqRj4hFp_woU4aOT7i6VVCH613wozFeVfWztcORVo',
  variant: 'medium',
  resourceType: 'user',
  screenName: undefined,

}

export const mockYourSubmissionsReceivedData: ISubmissionProps[] = [{
  href: 'https://www.google.co.uk',
  title: '🗺 ️BOOST Bounty - Mentorship Reward 🗺️', timestamp: moment().subtract(2, 'days'), submissionsCount: 0, community: { name: 'social impact', href: 'https://www.google.co.uk' },
  status: 'draft',
  ethUSDAmount: 435,
  ethAmount: 0.5,
  submission: {
    avatar: mockAvatar,
    status: 'pendingAcceptance',
    timestamp: moment().subtract('10', 'minutes')
  }
}]

export const mockYourSubmissionsSubmittedData = [
 
{
  href: 'https://www.google.co.uk',
  title: '[Deploy Contract] Add overlay to modal loader while deploying a new contract.', timestamp: moment().subtract(2, 'days'), submissionsCount: 0, community: { name: 'social impact', href: 'https://www.google.co.uk' },
  status: 'active',
  ethUSDAmount: 435,
  ethAmount: 0.5,
  submission: {
    avatar: mockAvatar,
    status: 'declined',
    timestamp: moment().subtract('10', 'minutes')
  }
  },
  {
    href: 'https://www.google.co.uk',
    title: '🎨🔥 Faces of Ethereum Project - The Bounties Network x Pixura x #ArtProject', timestamp: moment().subtract(2, 'days'), submissionsCount: 0, community: { name: 'social impact', href: 'https://www.google.co.uk' },
    status: 'active',
    ethUSDAmount: 435,
    ethAmount: 0.5,
  submission: {
    avatar: mockAvatar,
    status: 'pendingAcceptance',
    timestamp: moment().subtract('10', 'minutes')
  }
  },
  {
    href: 'https://www.google.co.uk',
    title: '🗺 ️BOOST Bounty - Mentorship Reward 🗺️', timestamp: moment().subtract(2, 'days'), submissionsCount: 0, community: { name: 'social impact', href: 'https://www.google.co.uk' },
    status: 'active',
    ethUSDAmount: 435,
    ethAmount: 0.5,
    submission: {
      avatar: mockAvatar,
      status: 'accepted',
      timestamp: moment().subtract('10', 'minutes')
    }
  },
  {
    href: 'https://www.google.co.uk',
    title: 'PARKOUR BOUNTY 1 — APEX SCHOOL OF MOVEMENT ✖️ BOUNT ...', timestamp: moment().subtract(2, 'days'), submissionsCount: 0, community: { name: 'social impact', href: 'https://www.google.co.uk' },
    status: 'active',
    ethUSDAmount: 435,
    ethAmount: 0.5,
    submission: {
      avatar: mockAvatar,
      status: 'pendingAcceptance',
      timestamp: moment().subtract('10', 'minutes')
    }
  },
]