"""empty message

Revision ID: c7a0fa1df48b
Revises: 
Create Date: 2021-04-02 01:28:49.120717

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c7a0fa1df48b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('betsapi_id', sa.Text(), nullable=True),
    sa.Column('bet365_id', sa.Text(), nullable=True),
    sa.Column('sport_id', sa.Text(), nullable=True),
    sa.Column('home', sa.Text(), nullable=True),
    sa.Column('away', sa.Text(), nullable=True),
    sa.Column('league', sa.Text(), nullable=True),
    sa.Column('time', sa.Text(), nullable=True),
    sa.Column('time_status', sa.Text(), nullable=True),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('bet365_id'),
    sa.UniqueConstraint('betsapi_id'),
    sa.UniqueConstraint('sport_id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('balance', sa.Float(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('predictions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_home', sa.Boolean(), nullable=False),
    sa.Column('event_line', sa.Text(), nullable=False),
    sa.Column('odds', sa.Text(), nullable=True),
    sa.Column('time_status', sa.Text(), nullable=True),
    sa.Column('db_event_id', sa.Integer(), nullable=False),
    sa.Column('bet365_id', sa.Text(), nullable=True),
    sa.Column('betsapi_id', sa.Text(), nullable=True),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['db_event_id'], ['events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wagers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('initial_event_line', sa.Text(), nullable=False),
    sa.Column('initial_odds', sa.Text(), nullable=False),
    sa.Column('initial_amount', sa.Float(), nullable=False),
    sa.Column('current_amount', sa.Float(), nullable=False),
    sa.Column('initial_fill', sa.Float(), nullable=False),
    sa.Column('liquidityProviderBool', sa.Boolean(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.Column('placed_by_user_id', sa.Integer(), nullable=False),
    sa.Column('prediction_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['placed_by_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['prediction_id'], ['predictions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('matched_wagers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('event_line', sa.Text(), nullable=False),
    sa.Column('matched_odds_home', sa.Text(), nullable=False),
    sa.Column('matched_odds_away', sa.Text(), nullable=False),
    sa.Column('time_status', sa.Text(), nullable=False),
    sa.Column('paidOutBool', sa.Boolean(), nullable=False),
    sa.Column('liquidity_provider_wager_id', sa.Integer(), nullable=False),
    sa.Column('liquidity_remover_wager_id', sa.Integer(), nullable=False),
    sa.Column('time_created', sa.DateTime(), nullable=True),
    sa.Column('time_updated', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['liquidity_provider_wager_id'], ['wagers.id'], ),
    sa.ForeignKeyConstraint(['liquidity_remover_wager_id'], ['wagers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('matched_wagers')
    op.drop_table('wagers')
    op.drop_table('predictions')
    op.drop_table('users')
    op.drop_table('events')
    # ### end Alembic commands ###
