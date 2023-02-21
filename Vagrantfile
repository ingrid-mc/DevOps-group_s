Vagrant.configure("2") do |config|

  # Set the box to use
  config.vm.box = "ubuntu/focal64"

  # Set the hostname of the VM
  config.vm.hostname = "node-app"

  # Forward port 3000 from guest to host
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Set up the shell provisioner to install Node.js and run the app
  config.vm.provision "shell", inline: <<-SHELL
    # Update package list
    sudo apt-get update

    # Install Node.js and npm
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Install the Node.js app dependencies
    cd /vagrant
    npm install

    # Run the app
    node app.js
  SHELL

  # Share the current folder between host and guest
  config.vm.synced_folder ".", "/vagrant"

end
