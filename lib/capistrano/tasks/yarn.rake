namespace :yarn do
  task :install do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          execute :yarn, fetch(:yarn_method), fetch(:yarn_flags)
        end
      end
    end
  end

  before "deploy:updated", "yarn:install"

  task :prune do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute :yarn, "prune", fetch(:yarn_prune_flags)
      end
    end
  end
  task :rebuild do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        with fetch(:yarn_env_variables, {}) do
          execute :yarn, "rebuild"
        end
      end
    end
  end
end

namespace :load do
  task :defaults do
    set :yarn_flags, %w[--production --silent --no-progress]
    set :yarn_prune_flags, "--production"
    set :yarn_roles, :all
    set :yarn_method, "install"
  end
end
