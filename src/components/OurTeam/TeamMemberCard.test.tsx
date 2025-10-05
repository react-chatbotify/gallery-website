import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { TeamMember } from '@/interfaces/TeamMember';

import TeamMemberCard from './TeamMemberCard';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, def?: string) => def ?? _key,
  }),
}));

const mockUseIsDesktop = vi.fn(() => true);
vi.mock('@/hooks/useIsDesktop', () => ({
  __esModule: true,
  default: () => mockUseIsDesktop(),
}));

const mkMember = (overrides: Partial<TeamMember> = {}): TeamMember => ({
  id: 'u-1',
  name: 'Ada Lovelace',
  avatarUrl: 'https://example.com/avatar.png',
  githubUrl: 'https://github.com/adalovelace',
  roles: [
    { name: 'Core Maintainer', project: 'Compute', link: 'https://example.com/compute' } as any,
    { name: 'Research', project: undefined, link: '' } as any,
  ],
  ...overrides,
});

beforeEach(() => {
  mockUseIsDesktop.mockReturnValue(true);
  vi.restoreAllMocks();
});

describe('TeamMemberCard', () => {
  it('renders avatar image when avatarUrl is provided', () => {
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    expect(screen.getByAltText(member.name)).toBeInTheDocument();
  });

  it('hides the image element after an onError event', () => {
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    const img = screen.getByAltText(member.name) as HTMLImageElement;
    fireEvent.error(img);
    expect(img.style.display).toBe('none');
  });

  it('renders fallback icon when no avatarUrl is provided', () => {
    const member = mkMember({ avatarUrl: undefined });
    const { container } = render(<TeamMemberCard member={member} />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders member name', () => {
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    expect(screen.getByText(member.name)).toBeInTheDocument();
  });

  it('renders GitHub link with correct attributes', () => {
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    const link = screen.getByRole('link', { name: /GitHub/i });
    expect(link).toHaveAttribute('href', member.githubUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders roles with and without project labels', () => {
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    expect(screen.getByText('Compute')).toBeInTheDocument();
    expect(screen.getByText('Core Maintainer')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
  });

  it('opens window when clicking a role that has link', () => {
    const member = mkMember();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null as any);
    render(<TeamMemberCard member={member} />);
    fireEvent.click(screen.getByText('Core Maintainer'));
    expect(openSpy).toHaveBeenCalledWith('https://example.com/compute');
  });

  it('does not open window when clicking a role without link', () => {
    const member = mkMember();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null as any);
    render(<TeamMemberCard member={member} />);
    fireEvent.click(screen.getByText('Research'));
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('renders correctly on mobile (useIsDesktop=false)', () => {
    mockUseIsDesktop.mockReturnValue(false);
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    expect(screen.getByText(member.name)).toBeInTheDocument();
  });

  it('supports multiple roles and renders them all', () => {
    const member = mkMember({
      roles: [
        { name: 'Design', project: 'UI', link: '' } as any,
        { name: 'Docs', project: undefined, link: '' } as any,
        { name: 'QA', project: 'Release', link: 'https://example.com/release' } as any,
      ],
    });
    render(<TeamMemberCard member={member} />);
    expect(screen.getByText('UI')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Release')).toBeInTheDocument();
    expect(screen.getByText('QA')).toBeInTheDocument();
  });

  it('renders the GitHub label via i18n default value', () => {
    const member = mkMember();
    render(<TeamMemberCard member={member} />);
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
  });
});